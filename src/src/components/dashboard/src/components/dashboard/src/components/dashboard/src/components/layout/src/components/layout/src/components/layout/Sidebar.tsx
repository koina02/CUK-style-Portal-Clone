import { useAuth } from "@/context/AuthContext";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Home, 
  Users, 
  Clock, 
  ChartBar,
  ClipboardList,
  Upload,
  User
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const SidebarLink = ({ to, icon: Icon, label }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center space-x-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-accent",
          isActive
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground"
        )
      }
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </NavLink>
  );
};

const StudentLinks = () => (
  <div className="space-y-1">
    <SidebarLink to="/" icon={Home} label="Dashboard" />
    <SidebarLink to="/courses" icon={BookOpen} label="My Courses" />
    <SidebarLink to="/assignments" icon={FileText} label="Assignments" />
    <SidebarLink to="/schedule" icon={Calendar} label="Schedule" />
    <SidebarLink to="/grades" icon={ChartBar} label="Grades" />
  </div>
);

const LecturerLinks = () => (
  <div className="space-y-1">
    <SidebarLink to="/" icon={Home} label="Dashboard" />
    <SidebarLink to="/courses" icon={BookOpen} label="My Courses" />
    <SidebarLink to="/assignments" icon={ClipboardList} label="Assignments" />
    <SidebarLink to="/students" icon={Users} label="Students" />
    <SidebarLink to="/upload" icon={Upload} label="Upload Materials" />
  </div>
);

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="h-screen bg-muted/30 border-r border-border w-64 p-4 hidden md:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {user.role === "student" ? "Student Portal" : "Lecturer Portal"}
          </h2>
          <div className="space-y-1">
            {user.role === "student" ? <StudentLinks /> : <LecturerLinks />}
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
            Quick Access
          </h2>
          <div className="space-y-1">
            <SidebarLink to="/profile" icon={User} label="Profile" />
            <SidebarLink to="/recent-activity" icon={Clock} label="Recent Activity" />
          </div>
        </div>
      </div>
    </div>
  );
}
