import { useState } from "react";
import { X, Plus, Trash2, BookOpen, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LessonModal({ isOpen, onClose }: LessonModalProps) {
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 10,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSave = () => {
    // Here you would save the lesson data
    console.log("Saving lesson:", { lessonTitle, lessonContent, questions });
    onClose();
    // Reset form
    setLessonTitle("");
    setLessonContent("");
    setQuestions([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Create New Lesson</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lesson Basic Info */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="lesson-title">Lesson Title</Label>
              <Input
                id="lesson-title"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="e.g., Understanding Solar Energy"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="lesson-content">Lesson Content</Label>
              <Textarea
                id="lesson-content"
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
                placeholder="Write your lesson content here..."
                className="mt-1 min-h-32"
              />
            </div>

            <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg border border-border">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Upload Additional Materials</p>
                <p className="text-xs text-muted-foreground">PDF, images, videos (max 50MB)</p>
              </div>
              <Button variant="outline" size="sm">
                Browse Files
              </Button>
            </div>
          </div>

          {/* Quiz Questions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Quiz Questions</h3>
              <Button onClick={addQuestion} size="sm" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Question</span>
              </Button>
            </div>

            {questions.map((question, questionIndex) => (
              <Card key={question.id} className="eco-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>Question {questionIndex + 1}</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <Label className="text-sm">Points:</Label>
                        <Input
                          type="number"
                          value={question.points}
                          onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value) || 0)}
                          className="w-20 h-8"
                          min="1"
                        />
                      </div>
                      <Button
                        onClick={() => deleteQuestion(question.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Question Text</Label>
                    <Textarea
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      placeholder="Enter your question..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Answer Options</Label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                          className="w-4 h-4 text-primary"
                        />
                        <Input
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                          className="flex-1"
                        />
                        <span className="text-xs text-muted-foreground w-16">
                          {question.correctAnswer === optionIndex ? "Correct" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {questions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No quiz questions added yet</p>
                <p className="text-sm">Click "Add Question" to create interactive quizzes</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="eco-gradient">
              Save & Assign Lesson
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}