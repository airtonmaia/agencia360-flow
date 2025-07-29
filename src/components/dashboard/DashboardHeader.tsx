import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const DashboardHeader = () => {
  return (
    <header className="bg-card/80 backdrop-blur-xl border-b border-border/60 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Pesquisar ou digite um comando..."
              className="pl-10 bg-background/60 border-border/60 rounded-xl focus:border-primary/60 transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-xl transition-all duration-300"
          >
            <Bell className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2 pl-3 border-l border-border/60">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-xl transition-all duration-300"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};