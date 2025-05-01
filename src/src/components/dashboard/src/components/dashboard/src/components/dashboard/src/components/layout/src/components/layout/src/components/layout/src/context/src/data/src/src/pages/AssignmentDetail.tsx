import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { assignments, courses } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Upload, Download, Check } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AssignmentDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [grading, setGrading] = useState(false);
  const [submission, setSubmission] = useState<File | null>(null);
  const [grade, setGrade] = useState<number | ''>('');
  const [feedback, setFeedback] = useState('');
  
  const assignment = assignments.find(a => a.id === id);
  
  if (!assignment) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Assignment not found</h1>
        <a href="/assignments" className="text-campus-400 hover:underline">
          Return to all assignments
        </a>
      </div>
    );
  }
  
  const course = courses.find(c => c.id === assignment.courseId);
  const isStudent = user?.role === "student";
  const isPastDue = new Date() > new Date(assignment.dueDate);
  
  const getStatusColor = (status: typeof assignment.status) => {
    switch (status) {
      case "pending": return "bg-orange-100 text-orange-800";
      case "submitted": return "bg-blue-100 text-blue-800";
      case "graded": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSubmission(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!submission) {
      toast.error("Please select a file to submit");
      return;
    }

    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Assignment submitted successfully!");
      setSubmitting(false);
    }, 1500);
  };

  const handleGradeSubmit = () => {
    if (grade === '') {
      toast.error("Please enter a grade");
      return;
    }

    setGrading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Assignment graded successfully!");
      setGrading(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <a 
          href="/assignments"
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Assignments
        </a>
      </div>
      
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{assignment.title}</h1>
          {course && (
            <p className="text-muted-foreground mt-1">
              {course.code} - {course.name}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end">
          <Badge className={cn("mb-2", getStatusColor(assignment.status))}>
            {assignment.status}
          </Badge>
          <p className="text-sm text-muted-foreground">
            Due: {format(new Date(assignment.dueDate), "MMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-muted-foreground">{assignment.description}</p>
          </div>
          
          {isStudent ? (
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Your Submission</h2>
              
              {assignment.status === "graded" ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Your Grade</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {assignment.grade} / {assignment.points} 
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        ({Math.round((assignment.grade! / assignment.points) * 100)}%)
                      </span>
                    </p>
                  </div>
                  
                  {assignment.feedback && (
                    <div>
                      <h3 className="font-medium mb-1">Feedback</h3>
                      <p className="text-muted-foreground p-3 bg-muted/30 rounded">
                        {assignment.feedback}
                      </p>
                    </div>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Your Submission
                  </Button>
                </div>
              ) : assignment.status === "submitted" ? (
                <div className="space-y-4">
                  <div className="p-4 border border-blue-200 bg-blue-50 rounded flex items-center">
                    <Check className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <p className="font-medium">Submission received</p>
                      <p className="text-sm text-muted-foreground">
                        Submitted on {format(new Date(), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Your Submission
                  </Button>
                </div>
              ) : isPastDue ? (
                <div className="p-4 border border-red-200 bg-red-50 rounded">
                  <p className="font-medium text-red-700">
                    The deadline for this assignment has passed.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid w-full max-w-lg gap-2">
                    <Label htmlFor="assignment-file">Upload your assignment</Label>
                    <Input id="assignment-file" type="file" onChange={handleFileChange} />
                    <p className="text-xs text-muted-foreground">
                      Accepted formats: .pdf, .doc, .docx, .zip (max 10MB)
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full bg-campus-400 hover:bg-campus-500"
                    disabled={!submission || submitting}
                    onClick={handleSubmit}
                  >
                    {submitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Assignment
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="border rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">Grade Assignment</h2>
              
              {assignment.status === "graded" ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="grade-input">Grade (out of {assignment.points})</Label>
                    <Input
                      id="grade-input"
                      type="number"
                      min={0}
                      max={assignment.points}
                      value={assignment.grade}
                      readOnly
                      className="max-w-[150px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea
                      id="feedback"
                      value={assignment.feedback || ''}
                      readOnly
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Submission
                  </Button>
                </div>
              ) : assignment.status === "submitted" ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="grade-input">Grade (out of {assignment.points})</Label>
                    <Input
                      id="grade-input"
                      type="number"
                      min={0}
                      max={assignment.points}
                      value={grade}
                      onChange={(e) => setGrade(e.target.value === '' ? '' : Number(e.target.value))}
                      className="max-w-[150px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Provide feedback to the student..."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Submission
                    </Button>
                    
                    <Button 
                      className="bg-campus-400 hover:bg-campus-500"
                      disabled={grade === '' || grading}
                      onClick={handleGradeSubmit}
                    >
                      {grading ? "Submitting..." : "Submit Grade"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-muted/30 rounded">
                  <p className="text-muted-foreground">
                    No submissions yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Assignment Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Points</p>
                <p className="font-medium">{assignment.points}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">
                  {format(new Date(assignment.dueDate), "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusColor(assignment.status)}>
                  {assignment.status}
                </Badge>
              </div>
            </div>
          </div>
          
          {course && (
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Course Information</h3>
              <div className="space-y-2">
                <p className="text-sm font-medium">{course.name}</p>
                <p className="text-sm text-muted-foreground">{course.code}</p>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
