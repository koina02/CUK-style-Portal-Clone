import { Course } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseListProps {
  courses: Course[];
  limit?: number;
}

export default function CourseList({ courses, limit }: CourseListProps) {
  const displayCourses = limit ? courses.slice(0, limit) : courses;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {displayCourses.length === 0 ? (
        <p className="text-center text-muted-foreground py-4 md:col-span-2 lg:col-span-3">No courses available</p>
      ) : (
        displayCourses.map(course => (
          <Link to={`/courses/${course.id}`} key={course.id}>
            <Card className="h-full transition-all hover:shadow-md hover:border-campus-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-campus-400">{course.code}</p>
                    <h3 className="text-lg font-semibold mt-1">{course.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
                  </div>
                  <div className="bg-campus-100 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-campus-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                  <p className="text-xs mt-2 text-muted-foreground">
                    Schedule: {course.schedule}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
