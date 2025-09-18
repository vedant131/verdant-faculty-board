import { BarChart3, TrendingUp, Users, Award, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold text-foreground">{analyticsData.overview.activeStudents}</p>
                <p className="text-xs text-success">+12% this month</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-foreground">{analyticsData.overview.completionRate}%</p>
                <p className="text-xs text-success">+5.2% this week</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-foreground">{analyticsData.overview.averageScore}%</p>
                <p className="text-xs text-success">+2.1% improvement</p>
              </div>
              <Award className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Eco-Points</p>
                <p className="text-2xl font-bold text-foreground">{analyticsData.overview.totalEcoPoints.toLocaleString()}</p>
                <p className="text-xs text-success">+892 this week</p>
              </div>
              <BarChart3 className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
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

        {/* Eco-Impact Visualization */}
        <Card className="eco-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                <span className="text-xs">🌱</span>
              </div>
              <span>Class Eco-Garden Growth</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-t from-success/10 to-success/5 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <div className="text-6xl mb-4">🌳</div>
                <p className="text-lg font-semibold text-success">Tree Level: 12</p>
                <p className="text-sm text-muted-foreground">Growing with class eco-points</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                  <div className="text-center">
                    <div className="text-lg">💧</div>
                    <p className="text-muted-foreground">{analyticsData.overview.waterSaved}L saved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg">🌿</div>
                    <p className="text-muted-foreground">{analyticsData.overview.co2Saved}kg CO₂</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg">🌳</div>
                    <p className="text-muted-foreground">{analyticsData.overview.treesEquivalent} trees</p>
                  </div>
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