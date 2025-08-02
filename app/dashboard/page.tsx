"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import NotesModal from "@/components/notes-modal"
import DayModal from "@/components/day-modal"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import ModernCalendar from "@/components/modern-calendar"
import ModernSubjectPanel from "@/components/modern-subject-panel"
import { SubjectService } from "@/service/subject"
import { ICreateSubjectRequest, ISubject } from "@/service/interfaces/subject"
import { NoteService } from "@/service/note"
import { INote } from "@/service/interfaces/note"

export interface Subject {
  id: string
  title: string
  description: string
  createdDate: Date
}

export interface Note {
  id: string
  subjectId: string
  content: string
  createdDate: Date
}

export default function Dashboard() {
  const [subjects, setSubjects] = useState<ISubject[]>([])
  const [notes, setNotes] = useState<INote[]>([])
  const [selectedSubject, setSelectedSubject] = useState<ISubject | null>(null)
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [username, setUsername] = useState("")
  const router = useRouter()

  const bootstrapData = async () => {
    const subjectsData = await SubjectService.getSubjects(currentDate)
    setSubjects(subjectsData)
  }

  useEffect(() => {
    bootstrapData()
  }, [currentDate])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("api-token")
    const storedUsername = localStorage.getItem("username")

    if (!isLoggedIn) {
      router.push("/")
      return
    }

    if (storedUsername) {
      setUsername(storedUsername)
    }

    bootstrapData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("api-token")
    localStorage.removeItem("username")
    router.push("/")
  }

  const addSubject = async (title: string, description: string, date?: Date) => {
    const newSubject: ICreateSubjectRequest = {
      title,
      description,
      studyDate: date || new Date(),
    }

    const createdSubjects = await SubjectService.addSubject(newSubject)

    const updatedSubjects = [...subjects, ...createdSubjects.filter(sub => sub.studyDate.getMonth() === currentDate.getMonth())]
    setSubjects(updatedSubjects)
  }

  const getSubjectsForDay = (date: Date) => {
    return subjects.filter((subject) => {
      const subjectDate = subject.studyDate
      return (
        subjectDate.getDate() === date.getDate() &&
        subjectDate.getMonth() === date.getMonth() &&
        subjectDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const getNotesForSubject = (subjectUuid: string) => {
    return subjects.find((subject) => subject.uuid === subjectUuid)?.notes || []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-cream-50 to-pastel-light-grey-50">
      {/* Floating Logout Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="bg-bg-surface/80 backdrop-blur-sm border-pastel-muted-blue-300 text-pastel-muted-blue-700 hover:bg-pastel-muted-blue-100 shadow-lg"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <main className="max-w-full mx-auto p-6 overflow-hidden h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden h-full">
          <div className="lg:col-span-3 h-full">
            <ModernCalendar
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              subjects={subjects}
              onSubjectClick={setSelectedSubject}
              onDayClick={setSelectedDay}
              username={username}
            />
          </div>

          <ModernSubjectPanel
            subjects={subjects}
            onAddSubject={addSubject}
            onSubjectClick={setSelectedSubject}
            currentMonth={currentDate}
          />
        </div>
      </main>

      {selectedSubject && (
        <NotesModal
          subject={selectedSubject}
          notes={getNotesForSubject(selectedSubject.uuid)}
          onAddNote={async (subjectUuid, content) => {
            const newNote = await NoteService.addNote(subjectUuid, content)
            const subject = subjects.find((s) => s.uuid === subjectUuid)
            if (subject) {
              subject.notes = subject.notes ? [newNote, ...subject.notes] : [newNote]
            }
            setSubjects([...subjects])
          }}
          onClose={() => setSelectedSubject(null)}
        />
      )}

      {selectedDay && (
        <DayModal
          date={selectedDay}
          subjects={getSubjectsForDay(selectedDay)}
          onSubjectClick={setSelectedSubject}
          onClose={() => setSelectedDay(null)}
          onAddSubject={addSubject}
        />
      )}
    </div>
  )
}
