import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigation } from "@/hooks/use-navigation";
import { FolderOpen, Plus, Play, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Projects() {
  const { navigateTo } = useNavigation();

  // Mock data - in real app this would come from API
  const projects = [
    {
      id: 1,
      name: "Marketing Podcast Series",
      description: "Monthly marketing insights podcast",
      status: "completed",
      outputType: "podcast",
      updatedAt: "2 hours ago",
    },
    {
      id: 2,
      name: "Product Demo Video",
      description: "Q4 product showcase presentation",
      status: "processing",
      outputType: "video",
      updatedAt: "5 minutes ago",
    },
    {
      id: 3,
      name: "Sales Training Slideshow",
      description: "Training materials for new sales team",
      status: "draft",
      outputType: "slideshow",
      updatedAt: "1 day ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'error':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getOutputTypeIcon = (type: string) => {
    switch (type) {
      case 'podcast':
        return 'microphone';
      case 'video':
        return 'video';
      case 'slideshow':
        return 'presentation';
      case 'pdf':
        return 'file-pdf';
      default:
        return 'file';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage and organize your content generation projects
          </p>
        </div>
        <Button onClick={() => navigateTo('/editor')}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="gradient-icon w-10 h-10">
                      <i className={`fas fa-${getOutputTypeIcon(project.outputType)} text-sm`} />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge variant={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigateTo(`/editor?project=${project.id}`)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Play className="w-4 h-4 mr-2" />
                        Regenerate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="capitalize">{project.outputType}</span>
                  <span>Updated {project.updatedAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first project to get started with AI-powered content generation.
            </p>
            <Button onClick={() => navigateTo('/editor')}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
