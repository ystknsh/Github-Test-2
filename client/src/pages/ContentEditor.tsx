import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MulmoScriptEditor from "@/components/mulmo/MulmoScriptEditor";
import MulmoScriptPreview from "@/components/mulmo/MulmoScriptPreview";
import { DEFAULT_MULMO_SCRIPT, formatMulmoScript, OUTPUT_TYPE_OPTIONS } from "@/lib/mulmo-script";
import { Save, Settings, Play } from "lucide-react";

export default function ContentEditor() {
  const [projectName, setProjectName] = useState("");
  const [outputType, setOutputType] = useState("podcast");
  const [script, setScript] = useState(formatMulmoScript(DEFAULT_MULMO_SCRIPT));

  const handleGenerate = () => {
    // TODO: Implement generation logic
    console.log("Generating content:", { projectName, outputType, script });
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving project:", { projectName, outputType, script });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Content Editor</h1>
            <p className="text-muted-foreground">
              Create and edit your MulmoScript content
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Project
            </Button>
            <Button onClick={handleGenerate}>
              <Play className="w-4 h-4 mr-2" />
              Generate Content
            </Button>
          </div>
        </div>
      </div>

      {/* Project Settings */}
      <div className="p-6 border-b border-border">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Project Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="output-type">Output Type</Label>
                <Select value={outputType} onValueChange={setOutputType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select output type" />
                  </SelectTrigger>
                  <SelectContent>
                    {OUTPUT_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <i className={`fas fa-${option.icon} w-4 h-4`} />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Editor Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-hidden">
        {/* Script Editor */}
        <div className="h-full">
          <MulmoScriptEditor
            initialScript={script}
            onScriptChange={setScript}
            onGenerate={handleGenerate}
          />
        </div>

        {/* Preview */}
        <div className="h-full">
          <MulmoScriptPreview script={script} className="h-full" />
        </div>
      </div>
    </div>
  );
}
