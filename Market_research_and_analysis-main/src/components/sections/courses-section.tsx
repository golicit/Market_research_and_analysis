"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, BookOpen } from "lucide-react"
import { useDashboard } from "@/lib/dashboard-context"

export function CoursesSection() {
  const { courses, courseFilter, setCourseFilter, updateCourseProgress } = useDashboard()

  const filteredCourses = courses.filter((course) => {
    if (courseFilter === "in-progress") return course.status === "In Progress"
    if (courseFilter === "completed") return course.status === "Completed"
    return true
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent" />
          <CardTitle>Purchased Courses</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4 pb-4 border-b border-border">
          {(["all", "in-progress", "completed"] as const).map((filter) => (
            <Button
              key={filter}
              variant={courseFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setCourseFilter(filter)}
              className={courseFilter === filter ? "bg-secondary text-white" : ""}
            >
              {filter === "all" ? "All" : filter === "in-progress" ? "In Progress" : "Completed"}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="p-4 rounded-lg border border-border bg-background/50 hover:bg-background transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{course.title}</h4>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    course.status === "Completed" ? "bg-accent/20 text-accent" : "bg-secondary/20 text-secondary"
                  }`}
                >
                  {course.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-semibold text-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              {course.status === "In Progress" && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-3 text-accent hover:text-accent"
                  onClick={() => updateCourseProgress(course.id, course.progress + 10)}
                >
                  Continue Learning →
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90" size="sm">
          Browse More Courses
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
