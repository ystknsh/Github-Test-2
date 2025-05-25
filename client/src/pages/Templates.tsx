import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigation } from "@/hooks/use-navigation";
import { Search, Play, BookOpen, MicOff, Video, Presentation, FileText } from "lucide-react";

export default function Templates() {
  const { navigateTo } = useNavigation();

  // Mock data - in real app this would come from API
  const templates = [
    {
      id: 1,
      name: "Interview Podcast",
      description: "Professional interview format with host and guest speakers",
      category: "podcast",
      icon: MicOff,
      color: "from-blue-500 to-purple-600",
      usageCount: 45,
    },
    {
      id: 2,
      name: "Product Demo Video",
      description: "Showcase product features with engaging visuals and narration",
      category: "video",
      icon: Video,
      color: "from-green-500 to-teal-600",
      usageCount: 32,
    },
    {
      id: 3,
      name: "Business Presentation",
      description: "Professional template for business meetings and pitches",
      category: "presentation",
      icon: Presentation,
      color: "from-purple-500 to-pink-600",
      usageCount: 28,
    },
    {
      id: 4,
      name: "Educational Tutorial",
      description: "Step-by-step tutorial format with clear explanations",
      category: "video",
      icon: BookOpen,
      color: "from-orange-500 to-red-500",
      usageCount: 19,
    },
    {
      id: 5,
      name: "News Podcast",
      description: "Daily news format with multiple segments and transitions",
      category: "podcast",
      icon: MicOff,
      color: "from-indigo-500 to-blue-600",
      usageCount: 15,
    },
    {
      id: 6,
      name: "Technical Documentation",
      description: "Comprehensive guide format for technical documentation",
      category: "pdf",
      icon: FileText,
      color: "from-gray-500 to-slate-600",
      usageCount: 12,
    },
  ];

  const categories = [
    { value: "all", label: "All Templates" },
    { value: "podcast", label: "Podcast" },
    { value: "video", label: "Video" },
    { value: "presentation", label: "Presentation" },
    { value: "pdf", label: "PDF" },
  ];

  const handleUseTemplate = (templateId: number) => {
    navigateTo(`/editor?template=${templateId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground">
            Pre-built templates to jumpstart your content creation
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={category.value === "all" ? "default" : "outline"}
                size="sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.id} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${template.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Used {template.usageCount} times
                  </span>
                  <Button 
                    size="sm"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create Custom Template */}
      <Card className="border-dashed">
        <CardContent className="text-center py-12">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Create Custom Template</h3>
              <p className="text-muted-foreground">
                Build your own template from scratch or customize an existing one
              </p>
            </div>
            <Button onClick={() => navigateTo('/editor?custom=true')}>
              Create Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
