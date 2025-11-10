"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Course {
  id: number
  title: string
  instructor: string
  progress: number
  status: "In Progress" | "Completed"
}

export interface Webinar {
  id: number
  title: string
  speaker: string
  date: string
  time: string
  zoomLink: string
  status: "Upcoming" | "Live Recording Available"
}

export interface Note {
  id: number
  title: string
  category: string
  date: string
  content: string
}

export interface Notification {
  id: number
  title: string
  message: string
  type: "info" | "success" | "warning"
  timestamp: Date
  read: boolean
}

export interface DashboardContextType {
  courses: Course[]
  webinars: Webinar[]
  notes: Note[]
  notifications: Notification[]

  // Filters
  courseFilter: "all" | "in-progress" | "completed"
  webinarFilter: "all" | "upcoming" | "recorded"
  noteCategory: "all" | "Trading" | "Analysis" | "Research"

  // Course actions
  setCourseFilter: (filter: "all" | "in-progress" | "completed") => void
  setWebinarFilter: (filter: "all" | "upcoming" | "recorded") => void
  setNoteCategory: (category: "all" | "Trading" | "Analysis" | "Research") => void

  // Data actions
  updateCourseProgress: (courseId: number, progress: number) => void
  addNote: (note: Note) => void
  deleteNote: (noteId: number) => void

  // Notification actions
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markNotificationRead: (notificationId: number) => void
  markAllNotificationsRead: () => void
  deleteNotification: (notificationId: number) => void
  unreadCount: number
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Advanced Stock Trading",
      instructor: "Dr. Marcus Reid",
      progress: 75,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Options Trading Fundamentals",
      instructor: "James Wheeler",
      progress: 45,
      status: "In Progress",
    },
    {
      id: 3,
      title: "Technical Analysis Mastery",
      instructor: "Sarah Chen",
      progress: 100,
      status: "Completed",
    },
  ])

  const [webinars] = useState<Webinar[]>([
    {
      id: 1,
      title: "Market Analysis - December 2024",
      speaker: "Expert Trader Pro",
      date: "Dec 15, 2024",
      time: "14:00 UTC",
      zoomLink: "https://zoom.us/j/123456789",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Crypto Trading Strategies",
      speaker: "Blockchain Expert",
      date: "Dec 18, 2024",
      time: "16:30 UTC",
      zoomLink: "https://zoom.us/j/987654321",
      status: "Upcoming",
    },
    {
      id: 3,
      title: "Portfolio Management Q&A",
      speaker: "Financial Advisor",
      date: "Dec 20, 2024",
      time: "15:00 UTC",
      zoomLink: "https://zoom.us/j/555555555",
      status: "Live Recording Available",
    },
  ])

  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Key Trading Principles",
      category: "Trading",
      date: "Dec 10, 2024",
      content: "Risk management is crucial...",
    },
    {
      id: 2,
      title: "Technical Analysis Notes",
      category: "Analysis",
      date: "Dec 08, 2024",
      content: "Support and resistance levels...",
    },
    {
      id: 3,
      title: "Market Observations",
      category: "Research",
      date: "Dec 05, 2024",
      content: "Recent trends in cryptocurrency...",
    },
  ])

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Course Completed",
      message: "You've completed Technical Analysis Mastery!",
      type: "success",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: 2,
      title: "Webinar Starting",
      message: "Market Analysis webinar starts in 1 hour",
      type: "info",
      timestamp: new Date(Date.now() - 7200000),
      read: false,
    },
    {
      id: 3,
      title: "New Course Available",
      message: "Check out our new course on Futures Trading",
      type: "info",
      timestamp: new Date(Date.now() - 86400000),
      read: true,
    },
  ])

  const [courseFilter, setCourseFilter] = useState<"all" | "in-progress" | "completed">("all")
  const [webinarFilter, setWebinarFilter] = useState<"all" | "upcoming" | "recorded">("all")
  const [noteCategory, setNoteCategory] = useState<"all" | "Trading" | "Analysis" | "Research">("all")

  const updateCourseProgress = (courseId: number, progress: number) => {
    setCourses(
      courses.map((c) =>
        c.id === courseId ? { ...c, progress, status: progress === 100 ? "Completed" : "In Progress" } : c,
      ),
    )
  }

  const addNote = (note: Note) => {
    setNotes([note, ...notes])
  }

  const deleteNote = (noteId: number) => {
    setNotes(notes.filter((n) => n.id !== noteId))
  }

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.max(...notifications.map((n) => n.id), 0) + 1,
      timestamp: new Date(),
      read: false,
    }
    setNotifications([newNotification, ...notifications])
  }

  const markNotificationRead = (notificationId: number) => {
    setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DashboardContext.Provider
      value={{
        courses,
        webinars,
        notes,
        notifications,
        courseFilter,
        webinarFilter,
        noteCategory,
        setCourseFilter,
        setWebinarFilter,
        setNoteCategory,
        updateCourseProgress,
        addNote,
        deleteNote,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        unreadCount,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider")
  }
  return context
}
