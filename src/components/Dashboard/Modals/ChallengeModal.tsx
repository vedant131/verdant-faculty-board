import { useState } from "react";
import { Trophy, Calendar, Upload, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const challengeTemplates = [
  { id: "tree-planting", name: "Tree Plantation Drive", icon: "🌳", points: 50 },
  { id: "waste-segregation", name: "Waste Segregation", icon: "♻️", points: 30 },
  { id: "energy-saving", name: "Energy Conservation", icon: "💡", points: 40 },
  { id: "water-conservation", name: "Water Conservation", icon: "💧", points: 35 },
  { id: "composting", name: "Home Composting", icon: "🌱", points: 45 },
  { id: "cleanup", name: "Community Cleanup", icon: "🧹", points: 55 },
];

export function ChallengeModal({ isOpen, onClose }: ChallengeModalProps) {
  const [challengeTitle, setChallengeTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [points, setPoints] = useState(30);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const selectTemplate = (template: typeof challengeTemplates[0]) => {
    setChallengeTitle(template.name);
    setPoints(template.points);
    setSelectedTemplate(template.id);
    
    // Set default descriptions based on template
    const descriptions = {
      "tree-planting": "Plant a tree in your locality and upload a photo with the sapling. Include a sign with your name and date.",
      "waste-segregation": "Demonstrate proper waste segregation at home for one week. Upload photos showing separated organic, recyclable, and non-recyclable waste.",
      "energy-saving": "Implement energy-saving practices at home and document your efforts. Show before/after electricity meter readings.",
      "water-conservation": "Practice water conservation methods and create a video showing your conservation techniques.",
      "composting": "Start a home composting system and document the process over 2 weeks with photos and videos.",
      "cleanup": "Organize or participate in a community cleanup drive. Upload group photos and before/after area shots."
    };
    setDescription(descriptions[template.id as keyof typeof descriptions] || "");
  };

  const handleSave = () => {
    const challengeData = {
      title: challengeTitle,
      description,
      deadline,
      points,
      template: selectedTemplate
    };
    
    console.log("Saving challenge:", challengeData);
    onClose();
    
    // Reset form
    setChallengeTitle("");
    setDescription("");
    setDeadline(undefined);
    setPoints(30);
    setSelectedTemplate("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-accent" />
            <span>Create New Eco-Challenge</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Challenge Templates */}
          <div className="space-y-3">
            <Label>Quick Templates</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {challengeTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => selectTemplate(template)}
                  className={cn(
                    "p-4 rounded-lg border text-left hover:bg-secondary/50 transition-all",
                    selectedTemplate === template.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border"
                  )}
                >
                  <div className="text-2xl mb-2">{template.icon}</div>
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-muted-foreground">{template.points} points</div>
                </button>
              ))}
            </div>
          </div>

          {/* Challenge Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="challenge-title">Challenge Title</Label>
              <Input
                id="challenge-title"
                value={challengeTitle}
                onChange={(e) => setChallengeTitle(e.target.value)}
                placeholder="e.g., School Garden Tree Plantation"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Challenge Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the eco-activity, requirements, and submission guidelines..."
                className="mt-1 min-h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="points">Eco-Points Reward</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    id="points"
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
                    min="1"
                    max="100"
                    className="flex-1"
                  />
                  <Target className="h-5 w-5 text-accent" />
                </div>
              </div>
            </div>

            {/* Reference Media Upload */}
            <div className="space-y-3">
              <Label>Reference Materials (Optional)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg border border-border">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Upload Example Image</p>
                    <p className="text-xs text-muted-foreground">Show students what to do</p>
                  </div>
                  <Button variant="outline" size="sm">Browse</Button>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg border border-border">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Upload Tutorial Video</p>
                    <p className="text-xs text-muted-foreground">Step-by-step guidance</p>
                  </div>
                  <Button variant="outline" size="sm">Browse</Button>
                </div>
              </div>
            </div>

            {/* Challenge Preview */}
            {challengeTitle && (
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <h4 className="font-medium text-accent-foreground mb-2">Challenge Preview</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Title:</strong> {challengeTitle}</div>
                  <div><strong>Points:</strong> {points} eco-points</div>
                  {deadline && <div><strong>Deadline:</strong> {format(deadline, "PPP")}</div>}
                  {description && (
                    <div><strong>Description:</strong> {description.substring(0, 100)}{description.length > 100 ? "..." : ""}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="growth-gradient">
              Save & Assign Challenge
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}