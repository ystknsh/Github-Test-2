import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/hooks/use-navigation";
import MulmoScriptPreview from "@/components/mulmo/MulmoScriptPreview";
import { DEFAULT_MULMO_SCRIPT, formatMulmoScript } from "@/lib/mulmo-script";
import { 
  TrendingUp, 
  Play, 
  FolderOpen, 
  Plus,
  MicOff,
  Video,
  Presentation,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function Dashboard() {
  const { navigateTo } = useNavigation();

  const stats = [
    {
      title: "Total Projects",
      value: "12",
      icon: FolderOpen,
      change: "+3 this month",
      changeType: "positive" as const,
    },
    {
      title: "Active Generations",
      value: "2",
      icon: Play,
      change: "In progress",
      changeType: "neutral" as const,
    },
    {
      title: "Generated This Month",
      value: "47",
      icon: TrendingUp,
      change: "+15%",
      changeType: "positive" as const,
    },
  ];

  const quickActions = [
    {
      title: "Create Podcast",
      description: "Generate AI-powered podcast episodes",
      icon: MicOff,
      color: "from-blue-500 to-purple-600",
      action: () => navigateTo('/editor?type=podcast'),
    },
    {
      title: "Create Video",
      description: "Transform content into engaging videos",
      icon: Video,
      color: "from-green-500 to-teal-600",
      action: () => navigateTo('/editor?type=video'),
    },
    {
      title: "Create Slideshow",
      description: "Build dynamic presentations",
      icon: Presentation,
      color: "from-purple-500 to-pink-600",
      action: () => navigateTo('/editor?type=slideshow'),
    },
    {
      title: "Export PDF",
      description: "Generate publication-ready documents",
      icon: FileText,
      color: "from-orange-500 to-red-500",
      action: () => navigateTo('/editor?type=pdf'),
    },
  ];

  const recentActivity = [
    {
      title: "Marketing Podcast Episode 5",
      description: "Generation completed successfully",
      time: "2 hours ago",
      status: "completed",
      icon: CheckCircle,
    },
    {
      title: "Product Demo Video",
      description: "Processing... 65% complete",
      time: "5 minutes ago",
      status: "processing",
      icon: Clock,
    },
    {
      title: "Q3 Sales Presentation",
      description: "Generation failed - API quota exceeded",
      time: "1 day ago",
      status: "error",
      icon: AlertCircle,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your AI-powered content generation projects
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="stat-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 
                      'text-muted-foreground'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className="gradient-icon">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow duration-200 group">
                <CardContent className="p-6" onClick={action.action}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${action.color} group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity and Quick Start */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                        activity.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Badge variant={
                        activity.status === 'completed' ? 'default' :
                        activity.status === 'processing' ? 'secondary' :
                        'destructive'
                      }>
                        {activity.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quick Start</h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create Your First Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                      1
                    </div>
                    <span className="text-sm">Choose a template or start from scratch</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span className="text-sm text-muted-foreground">Write your content or import MulmoScript</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span className="text-sm text-muted-foreground">Generate podcast, video, or slideshow</span>
                  </div>
                </div>
                <Button 
                  onClick={() => navigateTo('/editor')} 
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* MulmoScript Preview */}
          <MulmoScriptPreview 
            script={formatMulmoScript(DEFAULT_MULMO_SCRIPT)}
            className="h-80"
          />
        </div>
      </div>
    </div>
  );
}
