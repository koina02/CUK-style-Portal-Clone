import { useAuth } from "@/context/AuthContext";
import { courses } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import CourseList from "@/components/dashboard/CourseList";
import { Plus } from "lucide-react";

export default function Courses() {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Please log in to view your courses.</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {user.role === "lecturer" ? "My Teaching Courses" : "My Courses"}
        </h1>
        
        {user.role === "lecturer" && (
          <Button className="bg-campus-400 hover:bg-campus-500">
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        )}
      </div>
      
      <CourseList courses={courses} />
    </div>
  );
}
