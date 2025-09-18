import { useState } from "react";
import { Megaphone, Users, Calendar, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const audiences = [
  { value: "all-school", label: "Whole School", icon: "🏫" },
  { value: "grade-6", label: "Grade 6", icon: "📚" },
  { value: "grade-7", label: "Grade 7", icon: "📚" },
  { value: "grade-8", label: "Grade 8", icon: "📚" },
  { value: "grade-9", label: "Grade 9", icon: "📚" },
  { value: "grade-10", label: "Grade 10", icon: "📚" },
  { value: "eco-club", label: "Eco Club Members", icon: "🌱" },
  { value: "top-performers", label: "Top Eco-Point Earners", icon: "🏆" },
];

const priorities = [
  { value: "low", label: "Low Priority", color: "text-muted-foreground" },
  { value: "medium", label: "Medium Priority", color: "text-warning" },
  { value: "high", label: "High Priority", color: "text-destructive" },
  { value: "urgent", label: "Urgent", color: "text-destructive font-bold" },
];

export function AnnouncementModal({ isOpen, onClose }: AnnouncementModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("");
  const [priority, setPriority] = useState("medium");
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [isScheduled, setIsScheduled] = useState(false);

  const handleSave = () => {
    const announcementData = {
      title,
      content,
      audience,
      priority,
      scheduleDate: isScheduled ? scheduleDate : null,
      createdAt: new Date()
    };
    
    console.log("Saving announcement:", announcementData);
    onClose();
    
    // Reset form
    setTitle("");
    setContent("");
    setAudience("");
    setPriority("medium");
    setScheduleDate(undefined);
    setIsScheduled(false);
  };

  const selectedAudience = audiences.find(a => a.value === audience);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Megaphone className="h-5 w-5 text-accent" />
            <span>Create Announcement</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Announcement Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="announcement-title">Announcement Title</Label>
              <Input
                id="announcement-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Upcoming Earth Day Celebration"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your announcement content here..."
                className="mt-1 min-h-32"
              />
            </div>

            {/* Audience and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Target Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {audiences.map((aud) => (
                      <SelectItem key={aud.value} value={aud.value}>
                        <div className="flex items-center space-x-2">
                          <span>{aud.icon}</span>
                          <span>{aud.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Priority Level</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <span className={p.color}>{p.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Schedule Options */}
            <div className="space-y-3">
              <Label>Publishing Options</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="publish-now"
                    name="schedule"
                    checked={!isScheduled}
                    onChange={() => setIsScheduled(false)}
                    className="w-4 h-4 text-primary"
                  />
                  <Label htmlFor="publish-now" className="flex-1">Publish Immediately</Label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="schedule-later"
                    name="schedule"
                    checked={isScheduled}
                    onChange={() => setIsScheduled(true)}
                    className="w-4 h-4 text-primary"
                  />
                  <Label htmlFor="schedule-later" className="flex-1">Schedule for Later</Label>
                </div>

                {isScheduled && (
                  <div className="ml-7">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !scheduleDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduleDate ? format(scheduleDate, "PPP 'at' p") : <span>Pick date & time</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={scheduleDate}
                          onSelect={setScheduleDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
            </div>

            {/* Banner Image Upload */}
            <div className="space-y-3">
              <Label>Banner Image (Optional)</Label>
              <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg border border-border">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Upload Banner Image</p>
                  <p className="text-xs text-muted-foreground">Recommended size: 800x400px, max 5MB</p>
                </div>
                <Button variant="outline" size="sm">
                  Browse Files
                </Button>
              </div>
            </div>

            {/* Preview */}
            {title && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-medium text-primary mb-2">Announcement Preview</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{title}</h5>
                    {selectedAudience && (
                      <div className="flex items-center space-x-1 text-xs bg-secondary px-2 py-1 rounded">
                        <Users className="h-3 w-3" />
                        <span>{selectedAudience.label}</span>
                      </div>
                    )}
                  </div>
                  {content && (
                    <p className="text-sm text-muted-foreground">
                      {content.substring(0, 150)}{content.length > 150 ? "..." : ""}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className={priorities.find(p => p.value === priority)?.color}>
                      {priorities.find(p => p.value === priority)?.label}
                    </span>
                    {isScheduled && scheduleDate && (
                      <span>Scheduled: {format(scheduleDate, "MMM dd, yyyy")}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="eco-gradient">
              {isScheduled ? "Schedule Announcement" : "Publish Announcement"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}