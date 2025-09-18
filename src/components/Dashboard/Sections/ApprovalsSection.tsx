import { useState } from "react";
import { CheckCircle, X, MessageSquare, Eye, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Submission {
  id: string;
  studentName: string;
  class: string;
  challengeTitle: string;
  submissionType: 'image' | 'video' | 'document';
  submissionUrl: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
}

// Sample submissions data
const sampleSubmissions: Submission[] = [
  {
    id: '1',
    studentName: 'Emma Johnson',
    class: '8A',
    challengeTitle: 'Tree Plantation Drive',
    submissionType: 'image',
    submissionUrl: '/api/placeholder/400/300',
    submittedAt: new Date('2024-01-15'),
    status: 'pending',
    description: 'Planted a mango tree in the school garden with proper care instructions.'
  },
  {
    id: '2',
    studentName: 'Arjun Patel',
    class: '7B',
    challengeTitle: 'Waste Segregation Challenge',
    submissionType: 'video',
    submissionUrl: '/api/placeholder/400/300',
    submittedAt: new Date('2024-01-14'),
    status: 'pending',
    description: 'Video showing proper waste segregation at home for the past week.'
  },
  {
    id: '3',
    studentName: 'Sofia Rodriguez',
    class: '9A',
    challengeTitle: 'Energy Conservation Week',
    submissionType: 'document',
    submissionUrl: '/api/placeholder/400/300',
    submittedAt: new Date('2024-01-13'),
    status: 'pending',
    description: 'Electricity bill comparison and energy-saving measures implemented.'
  },
  {
    id: '4',
    studentName: 'Liam Chen',
    class: '8B',
    challengeTitle: 'Community Cleanup',
    submissionType: 'image',
    submissionUrl: '/api/placeholder/400/300',
    submittedAt: new Date('2024-01-12'),
    status: 'approved',
    description: 'Before and after photos of the park cleanup activity with team.'
  }
];

export function ApprovalsSection() {
  const [submissions, setSubmissions] = useState<Submission[]>(sampleSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.challengeTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || submission.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApproval = (submissionId: string, approved: boolean) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId 
        ? { ...sub, status: approved ? 'approved' : 'rejected' }
        : sub
    ));

    toast({
      title: approved ? "Submission Approved" : "Submission Rejected",
      description: `${selectedSubmission?.studentName}'s submission has been ${approved ? 'approved' : 'rejected'}.`,
    });

    setSelectedSubmission(null);
    setFeedback('');
  };

  const handleBulkApprove = () => {
    const pendingSubmissions = submissions.filter(sub => sub.status === 'pending');
    setSubmissions(submissions.map(sub => 
      sub.status === 'pending' ? { ...sub, status: 'approved' } : sub
    ));

    toast({
      title: "Bulk Approval Complete",
      description: `${pendingSubmissions.length} submissions have been approved.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-success text-success-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-warning text-warning-foreground';
    }
  };

  const getSubmissionIcon = (type: string) => {
    switch (type) {
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'document': return '📄';
      default: return '📎';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Challenge Approvals</h2>
          <p className="text-muted-foreground">Review and approve student challenge submissions</p>
        </div>
        <Button 
          onClick={handleBulkApprove}
          className="flex items-center space-x-2 eco-gradient"
          disabled={!submissions.some(sub => sub.status === 'pending')}
        >
          <CheckCircle className="h-4 w-4" />
          <span>Bulk Approve All</span>
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students or challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submissions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="eco-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span>{getSubmissionIcon(submission.submissionType)}</span>
                  </div>
                  <div>
                    <CardTitle className="text-sm">{submission.studentName}</CardTitle>
                    <p className="text-xs text-muted-foreground">Class {submission.class}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(submission.status)}>
                  {submission.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">{submission.challengeTitle}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {submission.description}
                </p>
              </div>

              {/* Submission Preview */}
              <div className="bg-secondary/30 rounded-lg p-3">
                <div className="flex items-center justify-center h-24 bg-muted rounded">
                  <div className="text-center">
                    <span className="text-2xl">{getSubmissionIcon(submission.submissionType)}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {submission.submissionType.toUpperCase()} Submission
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                Submitted: {submission.submittedAt.toLocaleDateString()}
              </div>

              {submission.status === 'pending' && (
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedSubmission(submission)}
                    className="flex-1 bg-success hover:bg-success/90"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Review
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleApproval(submission.id, false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Review Submission</h3>
              <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Student:</span> {selectedSubmission.studentName}
                </div>
                <div>
                  <span className="font-medium">Class:</span> {selectedSubmission.class}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Challenge:</span> {selectedSubmission.challengeTitle}
                </div>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4 h-64 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl">{getSubmissionIcon(selectedSubmission.submissionType)}</span>
                  <p className="text-muted-foreground mt-2">
                    {selectedSubmission.submissionType.toUpperCase()} Preview
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Actual media viewer would be integrated here
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Student Description:</h4>
                <p className="text-sm text-muted-foreground bg-secondary/30 p-3 rounded">
                  {selectedSubmission.description}
                </p>
              </div>

              <div>
                <label className="font-medium text-sm">Feedback (Optional):</label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide feedback to the student..."
                  className="mt-1"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => handleApproval(selectedSubmission.id, true)}
                  className="flex-1 bg-success hover:bg-success/90"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Submission
                </Button>
                <Button
                  onClick={() => handleApproval(selectedSubmission.id, false)}
                  variant="destructive"
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject Submission
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}