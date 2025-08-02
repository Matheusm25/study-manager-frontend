"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import type { Subject } from "@/app/dashboard/page"

interface CalendarProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  subjects: Subject[]
  onSubjectClick: (subject: Subject) => void
}

export default function CalendarModern({ currentDate, onDateChange, subjects, onSubjectClick }: CalendarProps) {
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
    <Card className="bg-gradient-to-br from-white via-amber-50/50 to-orange-50/30 backdrop-blur-sm border-amber-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-amber-900 flex items-center gap-3">
            <CalendarIcon className="w-6 h-6" />
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("prev")}
              className="border-amber-400 text-amber-800 hover:bg-amber-200 bg-white/70 shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("next")}
              className="border-amber-400 text-amber-800 hover:bg-amber-200 bg-white/70 shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-7 gap-2 mb-6">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-bold text-amber-800 bg-amber-100 rounded-lg">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
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
                className={`h-32 border-2 rounded-xl p-2 transition-all duration-200 hover:shadow-lg ${
                  isToday
                    ? "border-amber-400 bg-gradient-to-br from-amber-100 to-orange-100 shadow-md"
                    : "border-amber-200 bg-gradient-to-br from-white to-amber-50/30 hover:border-amber-300"
                }`}
              >
                <div className={`text-sm font-bold mb-2 ${isToday ? "text-amber-900" : "text-amber-800"}`}>{day}</div>
                <div className="space-y-1 overflow-y-auto max-h-20">
                  {daySubjects.map((subject) => (
                    <div
                      key={subject.id}
                      onClick={() => onSubjectClick(subject)}
                      className="text-xs bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg px-2 py-1 cursor-pointer hover:from-amber-500 hover:to-orange-500 transition-all duration-200 truncate font-medium shadow-sm transform hover:scale-105"
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
