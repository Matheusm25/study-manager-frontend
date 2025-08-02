"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Subject } from "@/app/dashboard/page"

interface CalendarProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  subjects: Subject[]
  onSubjectClick: (subject: Subject) => void
}

export default function CalendarMinimal({ currentDate, onDateChange, subjects, onSubjectClick }: CalendarProps) {
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
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl text-amber-900 font-light tracking-wide">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("prev")}
              className="text-amber-700 hover:bg-amber-50 rounded-full w-10 h-10 p-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("next")}
              className="text-amber-700 hover:bg-amber-50 rounded-full w-10 h-10 p-0"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div
              key={day + index}
              className="p-4 text-center text-xs font-medium text-amber-600 uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
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
                className={`h-32 p-2 transition-all duration-200 hover:bg-amber-50 ${isToday ? "bg-amber-100" : ""}`}
              >
                <div className={`text-sm mb-2 ${isToday ? "text-amber-900 font-semibold" : "text-amber-700"}`}>
                  {day}
                </div>
                <div className="space-y-1 overflow-y-auto max-h-20">
                  {daySubjects.map((subject) => (
                    <div
                      key={subject.id}
                      onClick={() => onSubjectClick(subject)}
                      className="text-xs bg-amber-200 text-amber-900 rounded px-2 py-1 cursor-pointer hover:bg-amber-300 transition-colors truncate"
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
