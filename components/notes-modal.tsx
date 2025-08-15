"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, StickyNote, Calendar, Sparkles, Edit, Save, X, Trash2 } from "lucide-react"
import { ISubject } from "@/service/interfaces/subject"
import { INote } from "@/service/interfaces/note"

interface NotesModalProps {
  subject: ISubject
  notes: INote[]
  onAddNote: (subjectId: string, content: string) => void
  onEditSubject: (subjectData: ISubject) => void
  onDeleteSubject: (subjectId: string) => void
  onClose: () => void
}

export default function NotesModal({
  subject,
  notes,
  onAddNote,
  onEditSubject,
  onDeleteSubject,
  onClose,
}: NotesModalProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [noteContent, setNoteContent] = useState("")
  const [isEditingSubject, setIsEditingSubject] = useState(false)
  const [editTitle, setEditTitle] = useState(subject.title)
  const [editDescription, setEditDescription] = useState(subject.description)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (noteContent.trim()) {
      onAddNote(subject.uuid, noteContent.trim())
      setNoteContent("")
      setShowAddForm(false)
    }
  }

  const handleEditSubject = (e: React.FormEvent) => {
    e.preventDefault()
    if (editTitle.trim()) {
      onEditSubject({ ...subject, title: editTitle.trim(), description: editDescription.trim() })
      setIsEditingSubject(false)
    }
  }

  const handleDeleteSubject = () => {
    onDeleteSubject(subject.uuid)
    onClose()
  }

  const cancelEdit = () => {
    setEditTitle(subject.title)
    setEditDescription(subject.description)
    setIsEditingSubject(false)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[85vh] bg-bg-surface/95 backdrop-blur-xl border-0 shadow-2xl shadow-pastel-muted-blue-200/20 overflow-hidden p-0">
        {/* Modern Header */}
        <DialogHeader className="bg-gradient-to-r from-pastel-muted-blue-500 via-pastel-soft-pink-400 to-pastel-lavender-500 text-white relative overflow-hidden p-4 sm:p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-pastel-muted-blue-400/20 via-transparent to-pastel-soft-pink-400/20"></div>
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between mb-2 gap-y-2">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <StickyNote className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight">{subject.title}</DialogTitle>
                  <p className="text-pastel-muted-blue-100 font-medium text-sm">Anotações de {subject.title}</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm ml-auto">
                {notes.length} notas
              </Badge>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
        </DialogHeader>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(85vh-100px)] sm:max-h-[calc(85vh-120px)]">
          {/* Subject Details Card */}
          <Card className="border-0 bg-gradient-to-br from-pastel-sage-50 to-pastel-cream-50 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between mb-2 sm:mb-3 gap-y-2">
                <h3 className="font-bold text-text-primary flex items-center gap-2 text-base sm:text-lg">
                  <Sparkles className="w-4 h-4" />
                  Detalhes da Matéria
                </h3>
                <div className="flex gap-2 ml-auto">
                  {!isEditingSubject ? (
                    <>
                      <Button
                        tabIndex={-1}
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditingSubject(true)}
                        className="border-pastel-sage-300 text-pastel-sage-700 hover:bg-pastel-sage-100 rounded-xl bg-transparent"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        tabIndex={-1}
                        size="sm"
                        variant="outline"
                        onClick={handleDeleteSubject}
                        className="border-pastel-soft-pink-300 text-pastel-soft-pink-700 hover:bg-pastel-soft-pink-100 rounded-xl bg-transparent"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Excluir
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        onClick={handleEditSubject}
                        className="bg-gradient-to-r from-pastel-sage-500 to-pastel-muted-blue-500 hover:from-pastel-sage-600 hover:to-pastel-muted-blue-600 text-white border-0 rounded-xl"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Salvar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelEdit}
                        className="border-pastel-sage-300 text-pastel-sage-700 hover:bg-pastel-sage-100 rounded-xl bg-transparent"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {isEditingSubject ? (
                <form onSubmit={handleEditSubject} className="space-y-3">
                  <div>
                    <Label htmlFor="edit-title" className="text-text-primary font-medium text-sm">
                      Título da Matéria
                    </Label>
                    <Input
                      id="edit-title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border-0 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-pastel-sage-400 rounded-xl mt-1 text-sm"
                      placeholder="Digite o título da matéria..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description" className="text-text-primary font-medium text-sm">
                      Descrição
                    </Label>
                    <Textarea
                      id="edit-description"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="border-0 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-pastel-sage-400 rounded-xl mt-1 resize-none text-sm"
                      placeholder="Descreva o que você vai estudar..."
                      rows={3}
                    />
                  </div>
                </form>
              ) : (
                <>
                  <p className="text-text-secondary mb-2 sm:mb-3 leading-relaxed text-sm">{subject.description}</p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Criado em {subject.studyDate.toLocaleDateString('pt-BR')}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Add Note Section */}
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-text-primary">Notes</h3>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-pastel-sage-500 to-pastel-muted-blue-500 hover:from-pastel-sage-600 hover:to-pastel-muted-blue-600 text-white border-0 rounded-xl transition-all duration-200 hover:scale-105 ml-auto"
              size="sm"
              tabIndex={-1}
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Nota
            </Button>
          </div>

          {showAddForm && (
            <Card className="border-0 bg-gradient-to-br from-pastel-sage-50 to-pastel-cream-50 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <Label htmlFor="note-content" className="text-text-primary font-medium text-sm">
                      Conteúdo da Nota
                    </Label>
                    <Textarea
                      id="note-content"
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      className="border-0 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-pastel-sage-400 rounded-xl mt-1 text-sm"
                      placeholder="Escreva suas anotações de estudo aqui..."
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-pastel-sage-500 to-pastel-muted-blue-500 hover:from-pastel-sage-600 hover:to-pastel-muted-blue-600 text-white border-0 rounded-xl transition-all duration-200 hover:scale-105 text-sm"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Salvar Nota
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                      className="border-pastel-sage-300 text-pastel-sage-700 hover:bg-pastel-sage-100 rounded-xl text-sm"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Notes List */}
          <div className="space-y-3 sm:space-y-4">
            {notes.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pastel-sage-100 to-pastel-cream-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <StickyNote className="w-6 h-6 sm:w-8 sm:h-8 text-pastel-sage-600" />
                </div>
                <p className="text-text-primary font-medium mb-1 sm:mb-2 text-base">Nenhuma nota ainda</p>
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
                    <CardContent className="p-4 sm:p-6 relative">
                      <p className="text-text-primary mb-3 sm:mb-4 whitespace-pre-wrap leading-relaxed text-sm">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>
                          Criado em {note.createdAt.toLocaleDateString('pt-BR')} às {note.createdAt.toLocaleTimeString('pt-BR')}
                        </span>
                      </div>

                      {/* Decorative Element */}
                      <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-bl from-pastel-sage-200/20 to-transparent rounded-full -translate-y-3 translate-x-3 sm:-translate-y-4 sm:translate-x-4 group-hover:scale-125 transition-transform duration-300"></div>
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
