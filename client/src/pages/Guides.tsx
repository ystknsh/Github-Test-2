import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Clock, User, ChevronRight } from "lucide-react";

export default function Guides() {
  const guides = [
    {
      id: 1,
      title: "Getting Started with MulmoCast",
      description: "Learn the basics of creating your first AI-powered content with MulmoScript.",
      category: "Beginner",
      readTime: "5 min",
      author: "MulmoCast Team",
      featured: true,
    },
    {
      id: 2,
      title: "MulmoScript Format Reference",
      description: "Complete reference for the MulmoScript JSON/YAML format and all available options.",
      category: "Reference",
      readTime: "10 min",
      author: "Technical Team",
      featured: true,
    },
    {
      id: 3,
      title: "Advanced Audio & Video Generation",
      description: "Master advanced techniques for creating professional-quality multimedia content.",
      category: "Advanced",
      readTime: "15 min",
      author: "AI Specialist",
      featured: false,
    },
    {
      id: 4,
      title: "Working with Multiple Speakers",
      description: "Create engaging content with multiple AI voices and character personalities.",
      category: "Intermediate",
      readTime: "8 min",
      author: "Content Creator",
      featured: false,
    },
    {
      id: 5,
      title: "Optimizing for Different Output Formats",
      description: "Best practices for generating content across podcasts, videos, and presentations.",
      category: "Intermediate",
      readTime: "12 min",
      author: "Product Team",
      featured: false,
    },
    {
      id: 6,
      title: "API Integration Guide",
      description: "Integrate MulmoCast into your existing workflows with our comprehensive API.",
      category: "Advanced",
      readTime: "20 min",
      author: "Developer Team",
      featured: false,
    },
  ];

  const categories = [
    { value: "all", label: "All Guides", count: guides.length },
    { value: "beginner", label: "Beginner", count: guides.filter(g => g.category === "Beginner").length },
    { value: "intermediate", label: "Intermediate", count: guides.filter(g => g.category === "Intermediate").length },
    { value: "advanced", label: "Advanced", count: guides.filter(g => g.category === "Advanced").length },
    { value: "reference", label: "Reference", count: guides.filter(g => g.category === "Reference").length },
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'reference':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const featuredGuides = guides.filter(guide => guide.featured);
  const otherGuides = guides.filter(guide => !guide.featured);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Guides & Documentation</h1>
          <p className="text-muted-foreground">
            Learn how to use MulmoCast effectively and master AI-powered content creation
          </p>
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={category.value === "all" ? "default" : "outline"}
              size="sm"
              className="h-9"
            >
              {category.label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Guides */}
      {featuredGuides.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Featured Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredGuides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-md transition-shadow duration-200 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={getCategoryColor(guide.category)}
                        >
                          {guide.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {guide.title}
                      </CardTitle>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{guide.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{guide.author}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Guides */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Guides</h2>
        <div className="space-y-4">
          {otherGuides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-md transition-shadow duration-200 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={getCategoryColor(guide.category)}
                      >
                        {guide.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {guide.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{guide.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{guide.author}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors ml-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">API Documentation</div>
                <div className="text-xs text-muted-foreground">Complete API reference</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Video Tutorials</div>
                <div className="text-xs text-muted-foreground">Step-by-step video guides</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Community Examples</div>
                <div className="text-xs text-muted-foreground">Real-world use cases</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
