"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, StickyNote, Calendar, Sparkles, Edit } from "lucide-react"
import { ISubject } from "@/service/interfaces/subject"
import { INote } from "@/service/interfaces/note"

interface NotesModalProps {
  subject: ISubject
  notes: INote[]
  onAddNote: (subjectId: string, content: string) => void
  onClose: () => void
}

export default function NotesModal({ subject, notes, onAddNote, onClose }: NotesModalProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [noteContent, setNoteContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (noteContent.trim()) {
      onAddNote(subject.uuid, noteContent.trim())
      setNoteContent("")
      setShowAddForm(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] bg-bg-surface/95 backdrop-blur-xl border-0 shadow-2xl shadow-pastel-muted-blue-200/20 overflow-hidden p-0">
        {/* Modern Header */}
        <DialogHeader className="bg-gradient-to-r from-pastel-muted-blue-500 via-pastel-soft-pink-400 to-pastel-lavender-500 text-white relative overflow-hidden p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-pastel-muted-blue-400/20 via-transparent to-pastel-soft-pink-400/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <StickyNote className="w-6 h-6" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold tracking-tight">{subject.title}</DialogTitle>
                  <p className="text-pastel-muted-blue-100 font-medium">Anotações de {subject.title}</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                {notes.length} notas
              </Badge>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
        </DialogHeader>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(85vh-120px)]">
          {/* Subject Details Card */}
          <Card className="border-0 bg-gradient-to-br from-pastel-sage-50 to-pastel-cream-50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-text-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Detalhes da Matéria
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-pastel-sage-300 text-pastel-sage-700 hover:bg-pastel-sage-100 rounded-xl bg-transparent"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar Matéria
                </Button>
              </div>
              <p className="text-text-secondary mb-3 leading-relaxed">{subject.description}</p>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Calendar className="w-4 h-4" />
                <span>Criado em {subject.studyDate.toLocaleDateString('pt-BR')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Add Note Section */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-text-primary">Notas</h3>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-pastel-sage-500 to-pastel-muted-blue-500 hover:from-pastel-sage-600 hover:to-pastel-muted-blue-600 text-white border-0 rounded-xl transition-all duration-200 hover:scale-105"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Nota
            </Button>
          </div>

          {showAddForm && (
            <Card className="border-0 bg-gradient-to-br from-pastel-sage-50 to-pastel-cream-50 shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="note-content" className="text-text-primary font-medium">
                      Conteúdo da Nota
                    </Label>
                    <Textarea
                      id="note-content"
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      className="border-0 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-pastel-sage-400 rounded-xl mt-2"
                      placeholder="Escreva suas anotações aqui..."
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-pastel-sage-500 to-pastel-muted-blue-500 hover:from-pastel-sage-600 hover:to-pastel-muted-blue-600 text-white border-0 rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Salvar Nota
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                      className="border-pastel-sage-300 text-pastel-sage-700 hover:bg-pastel-sage-100 rounded-xl"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Notes List */}
          <div className="space-y-4">
            {notes.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-pastel-sage-100 to-pastel-cream-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <StickyNote className="w-8 h-8 text-pastel-sage-600" />
                </div>
                <p className="text-text-primary font-medium mb-2">Nenhuma nota ainda</p>
                <p className="text-text-secondary text-sm">Adicione sua primeira nota de estudo!</p>
              </div>
            ) : (
              notes
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((note, index) => (
                  <Card
                    key={note.uuid}
                    className="border-0 bg-gradient-to-br from-white to-pastel-sage-50/50 shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden"
                  >
                    <CardContent className="p-6 relative">
                      <p className="text-text-primary mb-4 whitespace-pre-wrap leading-relaxed">{note.content}</p>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Criado em {note.createdAt.toLocaleDateString('pt-BR')} às {note.createdAt.toLocaleTimeString('pt-BR')}
                        </span>
                      </div>

                      {/* Decorative Element */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-pastel-sage-200/20 to-transparent rounded-full -translate-y-4 translate-x-4 group-hover:scale-125 transition-transform duration-300"></div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
