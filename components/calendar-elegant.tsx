"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import type { Subject } from "@/app/dashboard/page"

interface CalendarProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  subjects: Subject[]
  onSubjectClick: (subject: Subject) => void
}

export default function CalendarElegant({ currentDate, onDateChange, subjects, onSubjectClick }: CalendarProps) {
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

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    onDateChange(newDate)
  }

  const getSubjectsForDay = (day: number) => {
    return subjects.filter((subject) => {
      const subjectDate = subject.createdDate
      return (
        subjectDate.getDate() === day &&
        subjectDate.getMonth() === currentDate.getMonth() &&
        subjectDate.getFullYear() === currentDate.getFullYear()
      )
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  return (
    <Card className="bg-white border-2 border-amber-200 shadow-2xl">
      <CardHeader className="border-b-2 border-amber-100 bg-amber-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-amber-900 font-serif flex items-center gap-3">
            <BookOpen className="w-6 h-6" />
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("prev")}
              className="border-2 border-amber-300 text-amber-800 hover:bg-amber-100 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("next")}
              className="border-2 border-amber-300 text-amber-800 hover:bg-amber-100 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-7 gap-3 mb-6">
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-bold text-amber-900 bg-amber-100 rounded-lg border border-amber-200 shadow-sm"
            >
              {day.slice(0, 3)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3">
          {emptyDays.map((day) => (
            <div key={`empty-${day}`} className="h-32"></div>
          ))}

          {days.map((day) => {
            const daySubjects = getSubjectsForDay(day)
            const isToday =
              new Date().toDateString() ===
              new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

            return (
              <div
                key={day}
                className={`h-32 border-2 rounded-lg p-3 transition-all duration-200 hover:shadow-lg ${
                  isToday
                    ? "border-amber-500 bg-amber-100 shadow-md"
                    : "border-amber-200 bg-amber-50/50 hover:border-amber-400 hover:bg-amber-100/50"
                }`}
              >
                <div className={`text-sm font-bold mb-2 ${isToday ? "text-amber-900" : "text-amber-800"}`}>{day}</div>
                <div className="space-y-1 overflow-y-auto max-h-20">
                  {daySubjects.map((subject) => (
                    <div
                      key={subject.id}
                      onClick={() => onSubjectClick(subject)}
                      className="text-xs bg-amber-600 text-white rounded-md px-2 py-1 cursor-pointer hover:bg-amber-700 transition-all duration-200 truncate font-medium shadow-md border border-amber-700"
                    >
                      {subject.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
