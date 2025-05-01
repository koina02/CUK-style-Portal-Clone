import { Assignment } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AssignmentListProps {
  assignments: Assignment[];
  limit?: number;
}

export default function AssignmentList({ assignments, limit }: AssignmentListProps) {
  const displayAssignments = limit ? assignments.slice(0, limit) : assignments;
  
  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "submitted":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "graded":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "overdue":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-4">
      {displayAssignments.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No assignments available</p>
      ) : (
        displayAssignments.map(assignment => (
          <div 
            key={assignment.id} 
            className="border rounded-md p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <Link 
                  to={`/assignments/${assignment.id}`}
                  className="text-lg font-medium hover:text-campus-500 transition-colors"
                >
                  {assignment.title}
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {assignment.description}
                </p>
              </div>
              <Badge className={cn("ml-2", getStatusColor(assignment.status))}>
                {assignment.status}
              </Badge>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Due: {format(new Date(assignment.dueDate), "MMM d, yyyy")}
                </span>
              </div>
              <div className="text-sm font-medium">
                {assignment.points} points
                {assignment.grade && 
                  <span className="ml-2 text-green-600">
                    {assignment.grade}/{assignment.points}
                  </span>
                }
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
