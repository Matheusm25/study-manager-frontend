"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, BookOpen } from "lucide-react"
import type { Subject } from "@/app/dashboard/page"

interface SubjectPanelProps {
  subjects: Subject[]
  onAddSubject: (title: string, description: string) => void
  onSubjectClick: (subject: Subject) => void
  currentMonth: Date
}

export default function SubjectPanel({ subjects, onAddSubject, onSubjectClick, currentMonth }: SubjectPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && description.trim()) {
      onAddSubject(title.trim(), description.trim())
      setTitle("")
      setDescription("")
      setShowAddForm(false)
    }
  }

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

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-amber-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Subjects - {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-amber-600 hover:bg-amber-700 text-white"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Subject
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddForm && (
          <Card className="border-amber-300 bg-amber-50/50">
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-amber-800">
                    Título da Matéria
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                    placeholder="Ex: Equações Diferenciais"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-amber-800">
                    Descrição
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                    placeholder="Descrição da Matéria"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
                    Add Subject
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {subjects.length === 0 ? (
            <p className="text-amber-700 text-center py-8">No subjects for this month. Add your first subject!</p>
          ) : (
            subjects.map((subject) => (
              <Card
                key={subject.id}
                className="border-amber-300 bg-amber-50/50 cursor-pointer hover:bg-amber-100/50 transition-colors"
                onClick={() => onSubjectClick(subject)}
              >
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-amber-900 mb-2">{subject.title}</h3>
                  <p className="text-sm text-amber-700 mb-2">{subject.description}</p>
                  <p className="text-xs text-amber-600">Created: {subject.createdDate.toLocaleDateString('pt-BR')}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
