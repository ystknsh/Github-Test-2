import { useState } from "react";
import TopNavigation from "./TopNavigation";
import Sidebar from "./Sidebar";
import { useNavigation } from "@/hooks/use-navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentRoute } = useNavigation();

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <TopNavigation 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        hasActiveNotifications={true}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentRoute={currentRoute}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
