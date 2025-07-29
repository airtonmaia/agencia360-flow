import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  iconColor = "text-primary"
}: MetricCardProps) => {
  return (
    <Card className="p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          {change && (
            <p className={cn(
              "text-sm font-medium tracking-wide",
              changeType === "positive" && "text-emerald-600",
              changeType === "negative" && "text-red-500",
              changeType === "neutral" && "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors duration-300",
          iconColor
        )}>
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};