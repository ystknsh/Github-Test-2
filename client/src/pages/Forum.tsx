import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Heart, Reply, ExternalLink, Plus, TrendingUp, Clock } from "lucide-react";

export default function Forum() {
  const categories = [
    { name: "General Discussion", count: 156, color: "bg-blue-500" },
    { name: "MulmoScript Help", count: 89, color: "bg-green-500" },
    { name: "Feature Requests", count: 45, color: "bg-purple-500" },
    { name: "Bug Reports", count: 23, color: "bg-red-500" },
    { name: "Showcase", count: 67, color: "bg-orange-500" },
  ];

  const discussions = [
    {
      id: 1,
      title: "Best practices for voice synthesis in podcasts",
      author: "Alex Chen",
      authorInitials: "AC",
      category: "MulmoScript Help",
      replies: 12,
      likes: 8,
      lastActivity: "2 hours ago",
      isPinned: true,
      tags: ["voice", "podcast", "ai"],
    },
    {
      id: 2,
      title: "MulmoScript template library contributions",
      author: "Sarah Johnson",
      authorInitials: "SJ",
      category: "General Discussion",
      replies: 8,
      likes: 15,
      lastActivity: "1 day ago",
      isPinned: false,
      tags: ["templates", "community"],
    },
    {
      id: 3,
      title: "Feature Request: Real-time collaboration",
      author: "Mike Davis",
      authorInitials: "MD",
      category: "Feature Requests",
      replies: 23,
      likes: 34,
      lastActivity: "3 hours ago",
      isPinned: false,
      tags: ["collaboration", "feature-request"],
    },
    {
      id: 4,
      title: "Showcase: AI-generated documentary series",
      author: "Emma Wilson",
      authorInitials: "EW",
      category: "Showcase",
      replies: 6,
      likes: 19,
      lastActivity: "5 hours ago",
      isPinned: false,
      tags: ["showcase", "documentary", "video"],
    },
    {
      id: 5,
      title: "Bug: Audio generation failing with large scripts",
      author: "Tom Rodriguez",
      authorInitials: "TR",
      category: "Bug Reports",
      replies: 4,
      likes: 2,
      lastActivity: "1 day ago",
      isPinned: false,
      tags: ["bug", "audio", "performance"],
    },
  ];

  const trendingTopics = [
    { name: "AI Voice Quality", posts: 23 },
    { name: "Video Generation", posts: 18 },
    { name: "MulmoScript Tips", posts: 15 },
    { name: "Template Sharing", posts: 12 },
  ];

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat?.color || "bg-gray-500";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Community Forum</h1>
          <p className="text-muted-foreground">
            Connect with other MulmoCast users, share tips, and get help
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Discussion
            </Button>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Full Forum
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.count} posts</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Discussions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="text-sm">
                          {discussion.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              {discussion.isPinned && (
                                <Badge variant="secondary" className="text-xs">
                                  Pinned
                                </Badge>
                              )}
                              <h3 className="font-medium hover:text-primary transition-colors">
                                {discussion.title}
                              </h3>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>by {discussion.author}</span>
                              <span>•</span>
                              <span>{discussion.category}</span>
                              <span>•</span>
                              <span>{discussion.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Reply className="w-4 h-4" />
                              <span>{discussion.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{discussion.likes}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Forum Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forum Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">Total Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">New This Week</div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="w-5 h-5 mr-2" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={topic.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        #{index + 1}
                      </span>
                      <span className="text-sm font-medium">{topic.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {topic.posts}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask a Question
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                Share Your Work
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Browse Recent
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
