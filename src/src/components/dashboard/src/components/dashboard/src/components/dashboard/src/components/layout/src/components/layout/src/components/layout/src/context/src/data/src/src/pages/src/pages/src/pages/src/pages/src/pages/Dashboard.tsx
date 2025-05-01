import { useAuth } from "@/context/AuthContext";
import { assignments, courses, announcements } from "@/data/mockData";
import { FileText, BookOpen, ChartBar, Calendar } from "lucide-react";
import AssignmentList from "@/components/dashboard/AssignmentList";
import CourseList from "@/components/dashboard/CourseList";
import AnnouncementList from "@/components/dashboard/AnnouncementList";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Progress } from "@/components/ui/progress";

const StudentDashboard = () => {
  // Get upcoming assignments (due soon)
  const upcomingAssignments = [...assignments]
    .filter(a => a.status === "pending")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  
  // Get recent announcements
  const recentAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Get some mock progress data
  const completedAssignments = assignments.filter(a => 
    a.status === "graded" || a.status === "submitted"
  ).length;
  const totalAssignments = assignments.length;
  const progressPercentage = Math.round((completedAssignments / totalAssignments) * 100);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Courses"
          icon={<BookOpen className="h-4 w-4" />}
          className="lg:col-span-2"
        >
          <div className="text-2xl font-bold">{courses.length} Enrolled</div>
          <Progress className="mt-2" value={100} />
        </DashboardCard>
        
        <DashboardCard
          title="Assignments"
          icon={<FileText className="h-4 w-4" />}
        >
          <div className="text-2xl font-bold">{completedAssignments}/{totalAssignments}</div>
          <Progress className="mt-2" value={progressPercentage} />
        </DashboardCard>
        
        <DashboardCard
          title="Upcoming"
          icon={<Calendar className="h-4 w-4" />}
        >
          <div className="text-2xl font-bold">{upcomingAssignments.length}</div>
          <Progress className="mt-2" value={(upcomingAssignments.length / totalAssignments) * 100} />
        </DashboardCard>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCard title="Your Courses" icon={<BookOpen className="h-4 w-4" />}>
          <CourseList courses={courses} limit={3} />
          <div className="mt-4 text-center">
            <a href="/courses" className="text-sm text-campus-500 hover:underline">
              View all courses
            </a>
          </div>
        </DashboardCard>
        
        <div className="space-y-6">
          <DashboardCard title="Upcoming Assignments" icon={<FileText className="h-4 w-4" />}>
            <AssignmentList assignments={upcomingAssignments} limit={2} />
            <div className="mt-4 text-center">
              <a href="/assignments" className="text-sm text-campus-500 hover:underline">
                View all assignments
              </a>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Announcements">
            <AnnouncementList announcements={recentAnnouncements} limit={2} />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

const LecturerDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Lecturer Dashboard</h1>
        <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Courses"
          icon={<BookOpen className="h-4 w-4" />}
          className="lg:col-span-2"
        >
          <div className="text-2xl font-bold">{courses.length} Teaching</div>
          <Progress className="mt-2" value={100} />
        </DashboardCard>
        
        <DashboardCard
          title="Assignments"
          icon={<FileText className="h-4 w-4" />}
        >
          <div className="text-2xl font-bold">{assignments.length} Total</div>
          <Progress className="mt-2" value={100} />
        </DashboardCard>
        
        <DashboardCard
          title="Grading"
          icon={<ChartBar className="h-4 w-4" />}
        >
          <div className="text-2xl font-bold">
            {assignments.filter(a => a.status === "submitted").length} Pending
          </div>
          <Progress 
            className="mt-2" 
            value={100 - (assignments.filter(a => a.status === "submitted").length / assignments.length * 100)} 
          />
        </DashboardCard>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCard title="Your Courses" icon={<BookOpen className="h-4 w-4" />}>
          <CourseList courses={courses} limit={3} />
          <div className="mt-4 text-center">
            <a href="/courses" className="text-sm text-campus-500 hover:underline">
              View all courses
            </a>
          </div>
        </DashboardCard>
        
        <div className="space-y-6">
          <DashboardCard title="Assignments to Grade" icon={<FileText className="h-4 w-4" />}>
            <AssignmentList 
              assignments={assignments.filter(a => a.status === "submitted")} 
              limit={2} 
            />
            <div className="mt-4 text-center">
              <a href="/assignments" className="text-sm text-campus-500 hover:underline">
                View all assignments
              </a>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Announcements">
            <AnnouncementList announcements={announcements} limit={2} />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-3xl font-bold mb-4">Welcome to Campus Central</h1>
        <p className="text-muted-foreground mb-6">Please log in to access your dashboard.</p>
      </div>
    );
  }
  
  return user.role === "student" ? <StudentDashboard /> : <LecturerDashboard />;
}
