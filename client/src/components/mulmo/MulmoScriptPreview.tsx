import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parseMulmoScript } from "@/lib/mulmo-script";
import { Play, User, Clock } from "lucide-react";

interface MulmoScriptPreviewProps {
  script: string;
  className?: string;
}

export default function MulmoScriptPreview({ script, className }: MulmoScriptPreviewProps) {
  const parsedScript = parseMulmoScript(script);

  if (!parsedScript) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>Invalid MulmoScript format</p>
        </CardContent>
      </Card>
    );
  }

  const totalBeats = parsedScript.beats.length;
  const totalDuration = parsedScript.beats.reduce(
    (acc, beat) => acc + (beat.duration || 3000), 
    0
  );
  const speakers = parsedScript.speakers || [];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Script Preview</span>
          <Badge variant="secondary">{parsedScript.$mulmocast.version}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Script Stats */}
        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>{totalBeats} beats</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{Math.round(totalDuration / 1000)}s</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{speakers.length} speakers</span>
          </div>
        </div>

        {/* Speakers */}
        {speakers.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Speakers</h4>
            <div className="grid grid-cols-2 gap-2">
              {speakers.map((speaker, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{speaker.name}</span>
                  <span className="text-muted-foreground ml-2">({speaker.voice})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Beats Preview */}
        <div className="space-y-2">
          <h4 className="font-medium">Content Preview</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {parsedScript.beats.slice(0, 5).map((beat, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    Beat {index + 1}
                  </Badge>
                  {beat.speaker && (
                    <span className="text-xs text-muted-foreground">
                      {beat.speaker}
                    </span>
                  )}
                </div>
                <p className="text-sm">{beat.text}</p>
                {beat.image && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    <i className="fas fa-image mr-1"></i>
                    Image: {beat.image.prompt || beat.image.url || "Custom image"}
                  </div>
                )}
              </div>
            ))}
            {parsedScript.beats.length > 5 && (
              <div className="text-center text-sm text-muted-foreground">
                ... and {parsedScript.beats.length - 5} more beats
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
