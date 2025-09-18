import { Users, BookOpen, Trophy, Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Total Students",
    value: "1,247",
    change: "+12%",
    changeType: "increase" as const,
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Lessons Published",
    value: "89",
    change: "+5",
    changeType: "increase" as const,
    icon: BookOpen,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Challenges Assigned",
    value: "34",
    change: "+8",
    changeType: "increase" as const,
    icon: Trophy,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Eco-Points Earned",
    value: "15,892",
    change: "+23%",
    changeType: "increase" as const,
    icon: Coins,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="stats-card animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-success' : 'text-destructive'
                }`}>
                  {stat.change}
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
              
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${stat.color} bg-current rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: '75%' }}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}