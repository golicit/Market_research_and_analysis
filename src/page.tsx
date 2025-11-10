"use client"

import { useState } from "react";
import  Dashboard  from "../components/dashboard";
import { Sidebar } from "../components/sidebar";
import { DashboardProvider } from "../lib/dashboard-context";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <DashboardProvider>
      <div className="flex h-screen bg-background text-foreground dark">
        <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        <main className="flex-1 overflow-auto">
          <Dashboard />
        </main>
      </div>
    </DashboardProvider>
  )
}
