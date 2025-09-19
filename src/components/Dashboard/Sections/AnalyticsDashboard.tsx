import { BarChart3, TrendingUp, Users, Award, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Removed 3D components to fix rendering conflicts
import { AnimatedCounter } from "@/components/Interactive/AnimatedCounter";
import { FloatingCard, PulseEffect } from "@/components/Interactive/HoverEffects";

// Sample data for the analytics
const analyticsData = {
  overview: {
    totalStudents: 1247,
    activeStudents: 892,
    completionRate: 71.5,
    averageScore: 85.3,
    totalEcoPoints: 15892,
    co2Saved: 234.5,
    waterSaved: 1543,
    treesEquivalent: 12
  },
  topStudents: [
    { name: "Emma Johnson", class: "8A", points: 485, challenges: 12 },
    { name: "Arjun Patel", class: "7B", points: 472, challenges: 11 },
    { name: "Sofia Rodriguez", class: "9A", points: 458, challenges: 10 },
    { name: "Liam Chen", class: "8B", points: 445, challenges: 9 },
    { name: "Zara Ahmed", class: "7A", points: 438, challenges: 10 }
  ],
  popularChallenges: [
    { name: "Tree Plantation Drive", completions: 187, avgScore: 92 },
    { name: "Waste Segregation Challenge", completions: 164, avgScore: 85 },
    { name: "Energy Conservation Week", completions: 142, avgScore: 78 },
    { name: "Community Cleanup", completions: 128, avgScore: 94 },
    { name: "Water Conservation Project", completions: 115, avgScore: 81 }
  ]
};

export function AnalyticsDashboard() {
  const handleExport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting report as ${format}`);
    // Here you would implement the actual export functionality
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive insights into student engagement and eco-impact</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="all-classes">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-classes">All Classes</SelectItem>
              <SelectItem value="grade-6">Grade 6</SelectItem>
              <SelectItem value="grade-7">Grade 7</SelectItem>
              <SelectItem value="grade-8">Grade 8</SelectItem>
              <SelectItem value="grade-9">Grade 9</SelectItem>
              <SelectItem value="grade-10">Grade 10</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExport('pdf')} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export Excel</span>
          </Button>
        </div>
      </div>

      {/* Interactive Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FloatingCard className="relative">
          <Card className="stats-card border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <AnimatedCounter 
                    value={analyticsData.overview.activeStudents}
                    className="text-2xl font-bold text-foreground"
                  />
                  <p className="text-xs text-success animate-pulse">+12% this month</p>
                </div>
                <PulseEffect color="hsl(var(--primary))">
                  <Users className="h-8 w-8 text-primary" />
                </PulseEffect>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-10 translate-x-10" />
          </Card>
        </FloatingCard>

        <FloatingCard className="relative">
          <Card className="stats-card border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                  <AnimatedCounter 
                    value={analyticsData.overview.completionRate}
                    suffix="%"
                    decimals={1}
                    className="text-2xl font-bold text-foreground"
                  />
                  <p className="text-xs text-success animate-pulse">+5.2% this week</p>
                </div>
                <PulseEffect color="hsl(var(--success))">
                  <TrendingUp className="h-8 w-8 text-success" />
                </PulseEffect>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-success/5 rounded-full -translate-y-10 translate-x-10" />
          </Card>
        </FloatingCard>

        <FloatingCard className="relative">
          <Card className="stats-card border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <AnimatedCounter 
                    value={analyticsData.overview.averageScore}
                    suffix="%"
                    decimals={1}
                    className="text-2xl font-bold text-foreground"
                  />
                  <p className="text-xs text-success animate-pulse">+2.1% improvement</p>
                </div>
                <PulseEffect color="hsl(var(--accent))">
                  <Award className="h-8 w-8 text-accent" />
                </PulseEffect>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full -translate-y-10 translate-x-10" />
          </Card>
        </FloatingCard>

        <FloatingCard className="relative">
          <Card className="stats-card border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Eco-Points</p>
                  <AnimatedCounter 
                    value={analyticsData.overview.totalEcoPoints}
                    className="text-2xl font-bold text-foreground"
                  />
                  <p className="text-xs text-success animate-pulse">+892 this week</p>
                </div>
                <PulseEffect color="hsl(var(--warning))">
                  <BarChart3 className="h-8 w-8 text-warning" />
                </PulseEffect>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-20 h-20 bg-warning/5 rounded-full -translate-y-10 translate-x-10" />
          </Card>
        </FloatingCard>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Progress Chart */}
        <Card className="eco-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Student Progress Over Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Interactive chart showing lesson completions</p>
                <p className="text-sm text-muted-foreground mt-2">Would integrate with Chart.js or Recharts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Eco Impact Visualization */}
        <Card className="eco-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <span className="text-xs">🌱</span>
              </div>
              <span>Eco Impact Visualization</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-success/10 via-primary/5 to-accent/10 rounded-lg p-6 relative overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-4 left-4 w-3 h-3 bg-success rounded-full animate-pulse" />
                <div className="absolute top-12 right-8 w-2 h-2 bg-primary rounded-full animate-ping" />
                <div className="absolute bottom-8 left-12 w-4 h-4 bg-accent rounded-full animate-bounce" />
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-warning rounded-full animate-pulse" />
              </div>
              
              {/* Eco Stats Display */}
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-2">🌳</div>
                  <AnimatedCounter 
                    value={analyticsData.overview.totalEcoPoints}
                    className="text-3xl font-bold text-foreground"
                  />
                  <p className="text-sm text-muted-foreground">Total Eco-Points Generated</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <FloatingCard className="bg-white/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl">💧</div>
                    <AnimatedCounter 
                      value={analyticsData.overview.waterSaved} 
                      suffix="L"
                      className="text-sm font-semibold text-primary"
                    />
                    <p className="text-xs text-muted-foreground">Water Saved</p>
                  </FloatingCard>
                  
                  <FloatingCard className="bg-white/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl">🌿</div>
                    <AnimatedCounter 
                      value={analyticsData.overview.co2Saved} 
                      suffix="kg"
                      decimals={1}
                      className="text-sm font-semibold text-success"
                    />
                    <p className="text-xs text-muted-foreground">CO₂ Reduced</p>
                  </FloatingCard>
                  
                  <FloatingCard className="bg-white/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-2xl">🌳</div>
                    <AnimatedCounter 
                      value={analyticsData.overview.treesEquivalent} 
                      className="text-sm font-semibold text-accent"
                    />
                    <p className="text-xs text-muted-foreground">Trees Equivalent</p>
                  </FloatingCard>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="eco-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-accent" />
                <span>Top Eco-Champions</span>
              </span>
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topStudents.map((student, index) => (
                <div key={student.name} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      index === 0 ? 'bg-accent' : index === 1 ? 'bg-success' : index === 2 ? 'bg-warning' : 'bg-muted'
                    }`}>
                      <span className="text-sm font-bold text-white">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">Class {student.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-primary">{student.points} pts</p>
                    <p className="text-xs text-muted-foreground">{student.challenges} challenges</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Popular Challenges */}
        <Card className="eco-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Most Completed Challenges</span>
              </span>
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.popularChallenges.map((challenge, index) => (
                <div key={challenge.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{challenge.name}</p>
                    <span className="text-xs text-muted-foreground">{challenge.completions} completions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${(challenge.avgScore / 100) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-12">{challenge.avgScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}