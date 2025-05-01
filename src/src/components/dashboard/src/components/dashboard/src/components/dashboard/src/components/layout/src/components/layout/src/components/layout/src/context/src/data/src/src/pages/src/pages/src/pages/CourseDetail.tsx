import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { courses, assignments, announcements } from "@/data/mockData";
import DashboardCard from "@/components/dashboard/DashboardCard";
import AssignmentList from "@/components/dashboard/AssignmentList";
import AnnouncementList from "@/components/dashboard/AnnouncementList";
import { Button } from "@/components/ui/button";
import { FileText, Users, Calendar, ChevronLeft, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const course = courses.find(c => c.id === id);
  const courseAssignments = assignments.filter(a => a.courseId === id);
  const courseAnnouncements = announcements.filter(a => a.courseId === id);
  
  if (!course) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <a href="/courses" className="text-campus-400 hover:underline">
          Return to all courses
        </a>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <a 
          href="/courses"
          className="mr-2 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </a>
        <h1 className="text-3xl font-bold">{course.name}</h1>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-campus-100 text-campus-700">
          {course.code}
        </Badge>
        <Badge variant="outline">
          {course.credits} Credits
        </Badge>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Course Description</h2>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Assignments</h2>
              {user?.role === "lecturer" && (
                <Button size="sm" className="bg-campus-400 hover:bg-campus-500">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Assignment
                </Button>
              )}
            </div>
            <AssignmentList assignments={courseAssignments} />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Announcements</h2>
              {user?.role === "lecturer" && (
                <Button size="sm" className="bg-campus-400 hover:bg-campus-500">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Announcement
                </Button>
              )}
            </div>
            <AnnouncementList announcements={courseAnnouncements} />
          </div>
        </div>
        
        <div className="space-y-6">
          <DashboardCard title="Course Information">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Instructor</h4>
                <p>{course.instructor}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Schedule</h4>
                <p>{course.schedule}</p>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Add to Calendar
                </Button>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Course Resources">
            <div className="flex flex-col space-y-3">
              <Button variant="outline" className="justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Syllabus
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Lecture Notes
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Reading Materials
              </Button>
            </div>
          </DashboardCard>
          
          {user?.role === "lecturer" && (
            <DashboardCard title="Class Management">
              <div className="flex flex-col space-y-3">
                <Button variant="outline" className="justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Student Roster
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Grade Book
                </Button>
              </div>
            </DashboardCard>
          )}
        </div>
      </div>
    </div>
  );
}
