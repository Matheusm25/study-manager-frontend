"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, Plus, Sparkles } from "lucide-react"
import type { Subject } from "@/app/dashboard/page"

interface DayModalProps {
  date: Date
  subjects: Subject[]
  onSubjectClick: (subject: Subject) => void
  onClose: () => void
  onAddSubject: (title: string, description: string, date?: Date) => void
}

export default function DayModal({ date, subjects, onSubjectClick, onClose, onAddSubject }: DayModalProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSubjectTitle, setNewSubjectTitle] = useState("")
  const [newSubjectDescription, setNewSubjectDescription] = useState("")

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const formatDate = (date: Date) => {
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const handleAddSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSubjectTitle.trim() && newSubjectDescription.trim()) {
      onAddSubject(newSubjectTitle.trim(), newSubjectDescription.trim(), date)
      setNewSubjectTitle("")
      setNewSubjectDescription("")
      setShowAddForm(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-bg-surface/95 backdrop-blur-xl border-0 shadow-2xl shadow-pastel-muted-blue-200/20 overflow-hidden p-0">
        {/* Modern Header */}
        <DialogHeader className="bg-gradient-to-r from-pastel-muted-blue-500 via-pastel-soft-pink-400 to-pastel-lavender-500 text-white relative overflow-hidden p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-pastel-muted-blue-400/20 via-transparent to-pastel-soft-pink-400/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold tracking-tight">{formatDate(date)}</DialogTitle>
                  <p className="text-pastel-muted-blue-100 font-medium">Study Schedule</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                {subjects.length} subjects
              </Badge>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
        </DialogHeader>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {/* Add Subject Section */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-text-primary">Add Subject</h3>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-pastel-sage-500 to-pastel-muted-blue-500 hover:from-pastel-sage-600 hover:to-pastel-muted-blue-600 text-white border-0 rounded-xl transition-all duration-200 hover:scale-105"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              {showAddForm ? "Hide Form" : "Add New"}
            </Button>
          </div>

          {showAddForm && (
            <Card className="border-0 bg-gradient-to-br from-pastel-sage-50 to-pastel-cream-50 shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={handleAddSubjectSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="new-subject-title" className="text-text-primary font-medium">
                      Subject Title
                    </Label>
                    <Input
                      id="new-subject-title"
                      value={newSubjectTitle}
                      onChange={(e) => setNewSubjectTitle(e.target.value)}
                      className="border-0 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-pastel-sage-400 rounded-xl mt-1"
                      placeholder="Enter subject title..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-subject-description" className="text-text-primary font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="new-subject-description"
                      value={newSubjectDescription}
                      onChange={(e) => setNewSubjectDescription(e.target.value)}
                      className="border-0 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-pastel-sage-400 rounded-xl mt-1 resize-none"
                      placeholder="Describe what you'll study..."
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-pastel-sage-500 to-pastel-muted-blue-500 hover:from-pastel-sage-600 hover:to-pastel-muted-blue-600 text-white border-0 rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create Subject
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                      className="border-pastel-sage-300 text-pastel-sage-700 hover:bg-pastel-sage-100 rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Subjects List */}
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Subjects for This Day
            </h3>

            <div className="space-y-4">
              {subjects.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-pastel-sage-100 to-pastel-cream-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-pastel-sage-600" />
                  </div>
                  <p className="text-text-primary font-medium mb-2">No subjects scheduled</p>
                  <p className="text-text-secondary text-sm">No study subjects are scheduled for this day.</p>
                </div>
              ) : (
                subjects.map((subject, index) => (
                  <Card
                    key={subject.id}
                    className="border-0 bg-gradient-to-br from-white to-pastel-sage-50/50 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 group overflow-hidden"
                    onClick={() => {
                      onSubjectClick(subject)
                      onClose()
                    }}
                  >
                    <CardContent className="p-6 relative">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-bold text-text-primary group-hover:text-text-primary transition-colors text-lg">
                          {subject.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-pastel-sage-200 to-pastel-muted-blue-200 text-pastel-muted-blue-800 border-0 text-xs"
                          >
                            Study
                          </Badge>
                        </div>
                      </div>

                      <p className="text-text-secondary mb-4 leading-relaxed">{subject.description}</p>

                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Calendar className="w-4 h-4" />
                        <span>Created on {subject.createdDate.toLocaleDateString()}</span>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-pastel-sage-400/0 to-pastel-muted-blue-400/0 group-hover:from-pastel-sage-400/5 group-hover:to-pastel-muted-blue-400/5 transition-all duration-300 rounded-lg"></div>

                      {/* Decorative Element */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-pastel-sage-200/20 to-transparent rounded-full -translate-y-4 translate-x-4 group-hover:scale-125 transition-transform duration-300"></div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
