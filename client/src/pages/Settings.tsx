import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { VOICE_OPTIONS } from "@/lib/mulmo-script";
import { Save, Eye, EyeOff, TestTube, AlertCircle } from "lucide-react";

export default function Settings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    openaiApiKey: "",
    defaultVoice: "alloy",
    autoSave: true,
    notificationsEnabled: true,
    highQualityAudio: false,
    maxConcurrentGenerations: 3,
  });

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving settings:", settings);
  };

  const testApiConnection = () => {
    // TODO: Implement API test
    console.log("Testing API connection...");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure your MulmoCast preferences and API settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* API Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <div className="relative">
                  <Input
                    id="openai-key"
                    type={showApiKey ? "text" : "password"}
                    value={settings.openaiApiKey}
                    onChange={(e) => setSettings(prev => ({ ...prev, openaiApiKey: e.target.value }))}
                    placeholder="sk-..."
                    className="pr-20"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={testApiConnection}
                    >
                      <TestTube className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Required for AI content generation. Get your API key from the OpenAI dashboard.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-voice">Default Voice Model</Label>
                <Select 
                  value={settings.defaultVoice} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, defaultVoice: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice model" />
                  </SelectTrigger>
                  <SelectContent>
                    {VOICE_OPTIONS.map((voice) => (
                      <SelectItem key={voice.value} value={voice.value}>
                        {voice.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Generation Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Generation Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-save projects</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save projects during generation
                  </p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoSave: checked }))}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">High Quality Audio</Label>
                  <p className="text-sm text-muted-foreground">
                    Use higher quality audio generation (slower but better quality)
                  </p>
                </div>
                <Switch
                  checked={settings.highQualityAudio}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, highQualityAudio: checked }))}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="max-generations">Maximum Concurrent Generations</Label>
                <Select 
                  value={settings.maxConcurrentGenerations.toString()} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, maxConcurrentGenerations: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 generation</SelectItem>
                    <SelectItem value="2">2 generations</SelectItem>
                    <SelectItem value="3">3 generations</SelectItem>
                    <SelectItem value="5">5 generations</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Higher values may consume API quota faster
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show desktop notifications when generations complete
                  </p>
                </div>
                <Switch
                  checked={settings.notificationsEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notificationsEnabled: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="w-32">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Status</span>
                <Badge variant="default" className="bg-green-600">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Voice Synthesis</span>
                <Badge variant="default" className="bg-green-600">
                  Available
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Video Processing</span>
                <Badge variant="secondary">
                  2 in queue
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>API Calls</span>
                  <span>1,247 / 10,000</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '12.47%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Audio Minutes</span>
                  <span>89 / 500</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-600 rounded-full h-2" style={{ width: '17.8%' }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning */}
          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-orange-800">
                    API Key Required
                  </p>
                  <p className="text-xs text-orange-700">
                    Add your OpenAI API key to start generating content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
