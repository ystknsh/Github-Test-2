import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { formatMulmoScript, parseMulmoScript, DEFAULT_MULMO_SCRIPT } from "@/lib/mulmo-script";
import { Play, Save, Upload, Download } from "lucide-react";

interface MulmoScriptEditorProps {
  initialScript?: string;
  onScriptChange?: (script: string) => void;
  onGenerate?: (script: string) => void;
}

export default function MulmoScriptEditor({ 
  initialScript, 
  onScriptChange, 
  onGenerate 
}: MulmoScriptEditorProps) {
  const [script, setScript] = useState(
    initialScript || formatMulmoScript(DEFAULT_MULMO_SCRIPT)
  );
  const [isValid, setIsValid] = useState(true);

  const handleScriptChange = (value: string) => {
    setScript(value);
    
    // Validate script
    const parsed = parseMulmoScript(value);
    setIsValid(parsed !== null);
    
    onScriptChange?.(value);
  };

  const handleGenerate = () => {
    if (isValid) {
      onGenerate?.(script);
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.yaml,.yml';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          handleScriptChange(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExport = () => {
    const blob = new Blob([script], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mulmo-script.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CardTitle>MulmoScript Editor</CardTitle>
            <Badge variant={isValid ? "default" : "destructive"}>
              {isValid ? "Valid" : "Invalid"}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleImport}>
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button 
              onClick={handleGenerate}
              disabled={!isValid}
              className="bg-primary hover:bg-primary/90"
            >
              <Play className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-full pb-6">
        <Textarea
          value={script}
          onChange={(e) => handleScriptChange(e.target.value)}
          className="mulmo-editor h-full resize-none font-mono text-sm"
          placeholder="Enter your MulmoScript JSON here..."
        />
      </CardContent>
    </Card>
  );
}
