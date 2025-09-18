import { useState } from "react";
import { Gamepad2, RotateCcw, Save, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface GameRule {
  id: number;
  name: string;
  icon: string;
  positivePoints: number;
  negativePoints: number;
}

const defaultGames: GameRule[] = [
  { id: 1, name: "Waste Sorting Puzzle", icon: "♻️", positivePoints: 10, negativePoints: -2 },
  { id: 2, name: "Tree Grower", icon: "🌳", positivePoints: 15, negativePoints: -3 },
  { id: 3, name: "Recycling Match-3", icon: "🔄", positivePoints: 8, negativePoints: -1 },
  { id: 4, name: "Eco Runner", icon: "🏃", positivePoints: 12, negativePoints: -2 },
  { id: 5, name: "Plastic-Free Ocean Cleanup", icon: "🌊", positivePoints: 20, negativePoints: -5 },
  { id: 6, name: "Energy Saver Simulator", icon: "⚡", positivePoints: 18, negativePoints: -4 },
  { id: 7, name: "Water Saver Tap Challenge", icon: "💧", positivePoints: 14, negativePoints: -3 },
  { id: 8, name: "Eco-Quiz Master", icon: "🧠", positivePoints: 16, negativePoints: -3 },
  { id: 9, name: "Compost Creator", icon: "🌱", positivePoints: 22, negativePoints: -4 },
  { id: 10, name: "Green Transport Race", icon: "🚲", positivePoints: 13, negativePoints: -2 },
  { id: 11, name: "Paper Saver Puzzle", icon: "📄", positivePoints: 9, negativePoints: -1 },
  { id: 12, name: "Air Pollution Buster", icon: "💨", positivePoints: 17, negativePoints: -4 },
  { id: 13, name: "Wildlife Protector", icon: "🦋", positivePoints: 19, negativePoints: -4 },
  { id: 14, name: "Smart Recycling Factory", icon: "🏭", positivePoints: 25, negativePoints: -5 },
  { id: 15, name: "E-Waste Drop", icon: "📱", positivePoints: 15, negativePoints: -3 },
  { id: 16, name: "Eco Memory Match", icon: "🧩", positivePoints: 11, negativePoints: -2 },
  { id: 17, name: "Clean City Builder", icon: "🏙️", positivePoints: 24, negativePoints: -5 },
  { id: 18, name: "Eco Flashcards", icon: "📚", positivePoints: 7, negativePoints: -1 },
  { id: 19, name: "Carbon Footprint Tracker Game", icon: "👣", positivePoints: 21, negativePoints: -4 },
  { id: 20, name: "Rainwater Harvester", icon: "☔", positivePoints: 16, negativePoints: -3 },
  { id: 21, name: "Renewable Energy Tycoon", icon: "🔋", positivePoints: 28, negativePoints: -6 },
  { id: 22, name: "Climate Action Board Game", icon: "🎲", positivePoints: 26, negativePoints: -5 },
];

export function GamificationControls() {
  const [games, setGames] = useState<GameRule[]>(defaultGames);
  const { toast } = useToast();

  const updateGameRule = (gameId: number, field: 'positivePoints' | 'negativePoints', value: number) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, [field]: value } : game
    ));
  };

  const saveRules = () => {
    // Here you would save the rules to your backend
    console.log("Saving game rules:", games);
    toast({
      title: "Game Rules Updated",
      description: "All scoring rules have been successfully updated.",
    });
  };

  const resetToDefault = () => {
    setGames([...defaultGames]);
    toast({
      title: "Rules Reset",
      description: "All game rules have been reset to default values.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gamification Controls</h2>
          <p className="text-muted-foreground">Manage scoring rules for all 22 eco-games</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={resetToDefault} variant="outline" className="flex items-center space-x-2">
            <RotateCcw className="h-4 w-4" />
            <span>Reset to Default</span>
          </Button>
          <Button onClick={saveRules} className="flex items-center space-x-2 eco-gradient">
            <Save className="h-4 w-4" />
            <span>Save All Rules</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <Card key={game.id} className="eco-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <span className="text-lg">{game.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-medium leading-tight">{game.name}</h3>
                  <p className="text-xs text-muted-foreground">Game #{game.id}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs flex items-center space-x-1">
                    <Trophy className="h-3 w-3 text-success" />
                    <span>Positive Points</span>
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-success">+</span>
                    <Input
                      type="number"
                      value={game.positivePoints}
                      onChange={(e) => updateGameRule(game.id, 'positivePoints', parseInt(e.target.value) || 0)}
                      min="1"
                      max="50"
                      className="text-sm h-8"
                    />
                    <span className="text-xs text-muted-foreground">pts</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-destructive" />
                    <span>Negative Points</span>
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-destructive">−</span>
                    <Input
                      type="number"
                      value={Math.abs(game.negativePoints)}
                      onChange={(e) => updateGameRule(game.id, 'negativePoints', -(parseInt(e.target.value) || 0))}
                      min="0"
                      max="20"
                      className="text-sm h-8"
                    />
                    <span className="text-xs text-muted-foreground">pts</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Net Score Range:</span>
                  <span className="font-medium">
                    {game.negativePoints} to +{game.positivePoints}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Gamepad2 className="h-5 w-5 text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-accent-foreground">Scoring Guidelines</h4>
            <ul className="mt-2 text-sm text-muted-foreground space-y-1">
              <li>• <strong>Positive Points:</strong> Awarded for correct actions, successful challenges, and eco-friendly choices</li>
              <li>• <strong>Negative Points:</strong> Deducted for mistakes, wrong answers, or non-eco-friendly actions</li>
              <li>• Higher difficulty games should have higher point values</li>
              <li>• Keep negative points lower to encourage learning from mistakes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}