import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/use-navigation";
import { ChartLine, Menu, Bell, HelpCircle } from "lucide-react";

interface TopNavigationProps {
  onMenuToggle: () => void;
  hasActiveNotifications?: boolean;
}

export default function TopNavigation({ onMenuToggle, hasActiveNotifications }: TopNavigationProps) {
  const { navigateTo } = useNavigation();

  return (
    <header className="h-16 bg-sidebar-background border-b border-sidebar-border flex items-center justify-between px-6 electron-drag">
      <div className="flex items-center space-x-6 electron-no-drag">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="gradient-icon w-8 h-8">
            <i className="fas fa-podcast text-sm"></i>
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">MulmoCast</h1>
        </div>
        
        {/* Dashboard Icon with Notification Badge */}
        <div className="relative electron-no-drag">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateTo('/dashboard')}
            className="relative hover:bg-sidebar-accent"
          >
            <ChartLine className="h-5 w-5 text-primary" />
            {hasActiveNotifications && (
              <span className="notification-badge" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4 electron-no-drag">
        <Button variant="ghost" size="icon" className="hover:bg-sidebar-accent">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </Button>
        
        <Button variant="ghost" size="icon" className="hover:bg-sidebar-accent">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="hover:bg-sidebar-accent lg:hidden"
        >
          <Menu className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
}
