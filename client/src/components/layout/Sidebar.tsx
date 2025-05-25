import { cn } from "@/lib/utils";
import { useNavigation } from "@/hooks/use-navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Settings, 
  BookOpen, 
  MessageSquare, 
  User, 
  FolderOpen,
  Plus,
  Upload
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentRoute: string;
}

export default function Sidebar({ isOpen, onClose, currentRoute }: SidebarProps) {
  const { navigateTo } = useNavigation();

  const handleNavigation = (path: string) => {
    navigateTo(path);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const navigationItems = [
    { path: '/templates', icon: FolderOpen, label: 'Templates' },
    { path: '/guides', icon: BookOpen, label: 'Guides' },
    { path: '/forum', icon: MessageSquare, label: 'Community' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-sidebar-background border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Quick Actions */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => handleNavigation('/editor')}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-border hover:bg-sidebar-accent"
              onClick={() => handleNavigation('/projects')}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import MulmoScript
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "nav-item w-full text-left",
                  isActive && "active"
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => handleNavigation('/profile')}
            className="nav-item w-full text-left"
          >
            <Avatar className="w-8 h-8 mr-3">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm text-sidebar-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
