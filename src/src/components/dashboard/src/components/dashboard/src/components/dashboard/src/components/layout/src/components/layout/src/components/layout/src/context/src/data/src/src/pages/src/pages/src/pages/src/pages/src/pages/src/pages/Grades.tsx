import { useAuth } from "@/context/AuthContext";
import { assignments, courses } from "@/data/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Grades() {
  const { user } = useAuth();
  
  if (!user || user.role !== "student") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
        <p className="text-muted-foreground">Only students can access their grades.</p>
      </div>
    );
  }
  
  // Calculate course grades
  const courseGrades = courses.map(course => {
    const courseAssignments = assignments.filter(a => a.courseId === course.id && a.status === "graded");
    const totalPoints = courseAssignments.reduce((sum, a) => sum + a.points, 0);
    const earnedPoints = courseAssignments.reduce((sum, a) => sum + (a.grade || 0), 0);
    const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    
    let letterGrade = "N/A";
    if (totalPoints > 0) {
      if (percentage >= 90) letterGrade = "A";
      else if (percentage >= 80) letterGrade = "B";
      else if (percentage >= 70) letterGrade = "C";
      else if (percentage >= 60) letterGrade = "D";
      else letterGrade = "F";
    }
    
    return {
      course,
      percentage: Math.round(percentage),
      letterGrade,
      totalPoints,
      earnedPoints,
    };
  });
  
  // Calculate overall GPA
  const validGrades = courseGrades.filter(g => g.totalPoints > 0);
  const gpaPoints = validGrades.map(g => {
    switch(g.letterGrade) {
      case "A": return 4.0;
      case "B": return 3.0;
      case "C": return 2.0;
      case "D": return 1.0;
      default: return 0.0;
    }
  });
  
  const gpa = gpaPoints.length > 0 
    ? (gpaPoints.reduce((sum, p) => sum + p, 0) / gpaPoints.length).toFixed(2)
    : "N/A";
  
  const chartData = courseGrades.map(g => ({
    name: g.course.code,
    grade: g.percentage,
    color: getColorForGrade(g.percentage)
  }));
  
  function getColorForGrade(percentage: number) {
    if (percentage >= 90) return "#22c55e"; // Green for A
    if (percentage >= 80) return "#3b82f6"; // Blue for B
    if (percentage >= 70) return "#eab308"; // Yellow for C
    if (percentage >= 60) return "#f97316"; // Orange for D
    return "#ef4444"; // Red for F
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Grade Report</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overall GPA</CardTitle>
            <CardDescription>Cumulative grade point average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{gpa}</div>
            <p className="text-sm text-muted-foreground mt-1">
              Based on {validGrades.length} graded courses
            </p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Percentage scores by course</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="grade" name="Score" unit="%">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Course Grades</h2>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead className="hidden md:table-cell">Letter</TableHead>
                  <TableHead className="hidden md:table-cell">Points</TableHead>
                  <TableHead className="w-[200px]">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseGrades.map(({ course, percentage, letterGrade, totalPoints, earnedPoints }) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{percentage}%</TableCell>
                    <TableCell className="hidden md:table-cell">{letterGrade}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {earnedPoints}/{totalPoints}
                    </TableCell>
                    <TableCell>
                      <Progress 
                        value={percentage} 
                        className="h-2"
                        indicatorClassName={
                          percentage >= 90 ? "bg-green-500" :
                          percentage >= 80 ? "bg-blue-500" :
                          percentage >= 70 ? "bg-yellow-500" :
                          percentage >= 60 ? "bg-orange-500" :
                          "bg-red-500"
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Assignment Grades</h2>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead className="hidden md:table-cell">Points</TableHead>
                  <TableHead className="hidden md:table-cell">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments
                  .filter(a => a.status === "graded")
                  .map(assignment => {
                    const course = courses.find(c => c.id === assignment.courseId);
                    const percentage = Math.round((assignment.grade! / assignment.points) * 100);
                    
                    return (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.title}</TableCell>
                        <TableCell>{course?.code}</TableCell>
                        <TableCell className="font-medium">
                          {percentage}%
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {assignment.grade}/{assignment.points}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <Progress 
                              value={percentage}
                              className="h-2 w-[100px] mr-2"
                              indicatorClassName={
                                percentage >= 90 ? "bg-green-500" :
                                percentage >= 80 ? "bg-blue-500" :
                                percentage >= 70 ? "bg-yellow-500" :
                                percentage >= 60 ? "bg-orange-500" :
                                "bg-red-500"
                              }
                            />
                            <span className="text-xs text-muted-foreground">{percentage}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
