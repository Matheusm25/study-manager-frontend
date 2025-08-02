"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import NotesModal from "@/components/notes-modal"
import DayModal from "@/components/day-modal"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import ModernCalendar from "@/components/modern-calendar"
import ModernSubjectPanel from "@/components/modern-subject-panel"
import { addNote } from "@/utils/note-utils" // Declare the variable before using it

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
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [username, setUsername] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const storedUsername = localStorage.getItem("username")

    if (!isLoggedIn) {
      router.push("/")
      return
    }

    if (storedUsername) {
      setUsername(storedUsername)
    }

    // Load data from localStorage
    const storedSubjects = localStorage.getItem("subjects")
    const storedNotes = localStorage.getItem("notes")

    if (storedSubjects) {
      setSubjects(
        JSON.parse(storedSubjects).map((s: any) => ({
          ...s,
          createdDate: new Date(s.createdDate),
        })),
      )
    }

    if (storedNotes) {
      setNotes(
        JSON.parse(storedNotes).map((n: any) => ({
          ...n,
          createdDate: new Date(n.createdDate),
        })),
      )
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    router.push("/")
  }

  const addSubject = (title: string, description: string, date?: Date) => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      title,
      description,
      createdDate: date || new Date(), // Use provided date or current date
    }

    const updatedSubjects = [...subjects, newSubject]
    setSubjects(updatedSubjects)
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects))
  }

  const getSubjectsForMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    return subjects.filter((subject) => {
      const subjectDate = subject.createdDate
      return subjectDate.getFullYear() === year && subjectDate.getMonth() === month
    })
  }

  const getSubjectsForDay = (date: Date) => {
    return subjects.filter((subject) => {
      const subjectDate = subject.createdDate
      return (
        subjectDate.getDate() === date.getDate() &&
        subjectDate.getMonth() === date.getMonth() &&
        subjectDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const getNotesForSubject = (subjectId: string) => {
    return notes.filter((note) => note.subjectId === subjectId)
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
              subjects={getSubjectsForMonth(currentDate)}
              onSubjectClick={setSelectedSubject}
              onDayClick={setSelectedDay}
              username={username}
            />
          </div>

          <ModernSubjectPanel
            subjects={getSubjectsForMonth(currentDate)}
            onAddSubject={addSubject}
            onSubjectClick={setSelectedSubject}
            currentMonth={currentDate}
          />
        </div>
      </main>

      {selectedSubject && (
        <NotesModal
          subject={selectedSubject}
          notes={getNotesForSubject(selectedSubject.id)}
          onAddNote={(subjectId, content) => {
            const newNote = addNote(subjectId, content)
            setNotes((prevNotes) => [...prevNotes, newNote])
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
