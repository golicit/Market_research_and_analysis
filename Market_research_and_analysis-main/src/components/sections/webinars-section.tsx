"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, LinkIcon, Video } from "lucide-react"
import { useDashboard } from "@/lib/dashboard-context"

export function WebinarsSection() {
  const { webinars, webinarFilter, setWebinarFilter } = useDashboard()

  const filteredWebinars = webinars.filter((webinar) => {
    if (webinarFilter === "upcoming") return webinar.status === "Upcoming"
    if (webinarFilter === "recorded") return webinar.status === "Live Recording Available"
    return true
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-accent" />
          <CardTitle>Webinar Schedule</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4 pb-4 border-b border-border">
          {(["all", "upcoming", "recorded"] as const).map((filter) => (
            <Button
              key={filter}
              variant={webinarFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setWebinarFilter(filter)}
              className={webinarFilter === filter ? "bg-secondary text-white" : ""}
            >
              {filter === "all" ? "All" : filter === "upcoming" ? "Upcoming" : "Recorded"}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredWebinars.map((webinar) => (
            <div
              key={webinar.id}
              className="p-4 rounded-lg border border-border bg-background/50 hover:bg-background transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{webinar.title}</h4>
                  <p className="text-sm text-muted-foreground">{webinar.speaker}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    webinar.status === "Upcoming" ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent"
                  }`}
                >
                  {webinar.status}
                </span>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{webinar.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{webinar.time}</span>
                </div>
              </div>
              <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href={webinar.zoomLink} target="_blank" rel="noopener noreferrer">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  {webinar.status === "Upcoming" ? "Join Webinar" : "View Recording"}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
