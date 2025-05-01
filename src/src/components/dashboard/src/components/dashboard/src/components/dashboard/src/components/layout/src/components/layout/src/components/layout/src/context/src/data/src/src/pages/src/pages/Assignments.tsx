import { useAuth } from "@/context/AuthContext";
import { assignments, courses } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import AssignmentList from "@/components/dashboard/AssignmentList";
import { Plus } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Assignments() {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Please log in to view assignments.</div>;
  }
  
  const pendingAssignments = assignments.filter(a => a.status === "pending");
  const submittedAssignments = assignments.filter(a => a.status === "submitted");
  const gradedAssignments = assignments.filter(a => a.status === "graded");
  const overdueAssignments = assignments.filter(a => a.status === "overdue");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Assignments</h1>
        
        {user.role === "lecturer" && (
          <Button className="bg-campus-400 hover:bg-campus-500">
            <Plus className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">
            {user.role === "lecturer" ? "Assigned" : "Pending"}
            {pendingAssignments.length > 0 && ` (${pendingAssignments.length})`}
          </TabsTrigger>
          <TabsTrigger value="submitted">
            {user.role === "lecturer" ? "To Grade" : "Submitted"}
            {submittedAssignments.length > 0 && ` (${submittedAssignments.length})`}
          </TabsTrigger>
          <TabsTrigger value="graded">
            Graded
            {gradedAssignments.length > 0 && ` (${gradedAssignments.length})`}
          </TabsTrigger>
          {user.role === "student" && (
            <TabsTrigger value="overdue">
              Overdue
              {overdueAssignments.length > 0 && ` (${overdueAssignments.length})`}
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <AssignmentList assignments={assignments} />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          <AssignmentList assignments={pendingAssignments} />
        </TabsContent>
        
        <TabsContent value="submitted" className="mt-6">
          <AssignmentList assignments={submittedAssignments} />
        </TabsContent>
        
        <TabsContent value="graded" className="mt-6">
          <AssignmentList assignments={gradedAssignments} />
        </TabsContent>
        
        {user.role === "student" && (
          <TabsContent value="overdue" className="mt-6">
            <AssignmentList assignments={overdueAssignments} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
