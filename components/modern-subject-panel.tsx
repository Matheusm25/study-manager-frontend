"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, BookOpen, Calendar, Sparkles } from "lucide-react"
import { ISubject } from "@/service/interfaces/subject"

interface SubjectPanelProps {
  subjects: ISubject[]
  onAddSubject: (title: string, description: string, date?: Date) => void
  onSubjectClick: (subject: ISubject) => void
  currentMonth: Date
}

export default function ModernSubjectPanel({
  subjects,
  onAddSubject,
  onSubjectClick,
  currentMonth,
}: SubjectPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddSubject(title.trim(), description.trim())
      setTitle("")
      setDescription("")
      setShowAddForm(false) // Internal state control
    }
  }

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  return (
    <Card className="bg-bg-surface/95 backdrop-blur-xl border-0 shadow-2xl shadow-pastel-muted-blue-200/20 overflow-hidden h-full flex flex-col">
      {/* Modern Header */}
      <CardHeader className="bg-gradient-to-r from-pastel-muted-blue-500 via-pastel-soft-pink-400 to-pastel-lavender-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pastel-muted-blue-400/20 via-transparent to-pastel-soft-pink-400/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Matérias</CardTitle>
                <p className="text-pastel-muted-blue-100 text-sm">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
              {subjects.length}
            </Badge>
          </div>

          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm transition-all duration-200 hover:scale-105 rounded-xl"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Nova Matéria
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
      </CardHeader>

      <CardContent className="p-4 space-y-6 flex flex-col flex-1 min-h-0">
        {/* Modern Add Form */}
        {showAddForm && (
          <Card className="border-0 bg-gradient-to-br from-pastel-sage-50 to-pastel-cream-50 shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-text-primary font-medium">
                    Título da matéria
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-0 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-pastel-sage-400 rounded-xl mt-1"
                    placeholder="Ex: Equações Diferenciais"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-text-primary font-medium">
                    Descrição
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-0 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-pastel-sage-400 rounded-xl mt-1 resize-none"
                    placeholder="Descreva o que você vai estudar..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pastel-sage-500 to-pastel-muted-blue-500 hover:from-pastel-sage-600 hover:to-pastel-muted-blue-600 text-white border-0 rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Criar Matéria
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

        {/* Modern Subject List */}
        <div className="space-y-3 flex-1 overflow-y-auto min-h-0 pr-2">
          {subjects.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gradient-to-br from-pastel-sage-100 to-pastel-cream-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-pastel-sage-600" />
              </div>
              <p className="text-text-primary font-medium mb-1">Nenhuma matéria ainda</p>
              <p className="text-text-secondary text-sm">Adicione sua primeira matéria!</p>
            </div>
          ) : (
            subjects.map((subject, index) => (
              <Card
                key={subject.uuid}
                className="border-0 bg-gradient-to-br from-white to-pastel-sage-50/50 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 group overflow-hidden"
                onClick={() => onSubjectClick(subject)}
              >
                <CardContent className="p-4 relative overflow-hidden">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-text-primary group-hover:text-text-primary transition-colors text-sm leading-tight flex-1 pr-2">
                      {subject.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-pastel-sage-200 to-pastel-muted-blue-200 text-pastel-muted-blue-800 border-0 text-xs flex-shrink-0"
                    >
                      Estudar
                    </Badge>
                  </div>

                  <p className="text-text-secondary mb-2 line-clamp-2 leading-relaxed break-words">
                    {subject.description}
                  </p>

                  <div className="flex items-center gap-2 text-text-secondary text-xs">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{subject.studyDate.toLocaleDateString('pt-BR')}</span>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pastel-sage-400/0 to-pastel-muted-blue-400/0 group-hover:from-pastel-sage-400/5 group-hover:to-pastel-muted-blue-400/5 transition-all duration-300 rounded-lg"></div>

                  {/* Decorative Element */}
                  <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-pastel-sage-200/20 to-transparent rounded-full -translate-y-3 translate-x-3 group-hover:scale-125 transition-transform duration-300"></div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
