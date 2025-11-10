"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useDashboard } from "@/lib/dashboard-context"

export function NotesSection() {
  const { notes, noteCategory, setNoteCategory, deleteNote } = useDashboard()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNotes = notes.filter((note) => {
    const categoryMatch = noteCategory === "all" || note.category === noteCategory
    const searchMatch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-accent" />
          <CardTitle>Notes & E-Reader</CardTitle>
        </div>
        <Button size="icon" variant="ghost" className="text-accent hover:text-accent">
          <Plus className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              className="pl-10 bg-background border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 pb-3 border-b border-border overflow-x-auto">
            {(["all", "Trading", "Analysis", "Research"] as const).map((category) => (
              <Button
                key={category}
                variant={noteCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setNoteCategory(category)}
                className={noteCategory === category ? "bg-secondary text-white" : "whitespace-nowrap"}
              >
                {category === "all" ? "All Notes" : category}
              </Button>
            ))}
          </div>

          {/* Notes List */}
          <div className="space-y-3">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 rounded-lg border border-border bg-background/50 hover:bg-background cursor-pointer transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground text-sm">{note.title}</h4>
                    <div className="flex gap-2">
                      <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">{note.category}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteNote(note.id)}
                      >
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{note.content}</p>
                  <p className="text-xs text-muted-foreground">{note.date}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No notes found</p>
              </div>
            )}
          </div>

          <Button className="w-full bg-secondary hover:bg-secondary/90" size="sm">
            View E-Reader
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
