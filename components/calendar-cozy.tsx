"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Coffee } from "lucide-react"
import type { Subject } from "@/app/dashboard/page"

interface CalendarProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  subjects: Subject[]
  onSubjectClick: (subject: Subject) => void
}

export default function CalendarCozy({ currentDate, onDateChange, subjects, onSubjectClick }: CalendarProps) {
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
    <Card className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-amber-300 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-amber-900 font-medium flex items-center gap-3">
            <Coffee className="w-6 h-6" />
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("prev")}
              className="border-amber-400 text-amber-800 hover:bg-amber-100 bg-white/80 rounded-full shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth("next")}
              className="border-amber-400 text-amber-800 hover:bg-amber-100 bg-white/80 rounded-full shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-7 gap-2 mb-6">
          {["Seg", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-semibold text-amber-800 bg-gradient-to-b from-amber-100 to-orange-100 rounded-full shadow-sm"
            >
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
                className={`h-32 border rounded-2xl p-3 transition-all duration-300 hover:shadow-lg ${
                  isToday
                    ? "border-orange-400 bg-gradient-to-br from-orange-100 to-amber-100 shadow-md"
                    : "border-amber-300 bg-gradient-to-br from-white to-amber-50 hover:border-orange-300"
                }`}
              >
                <div className={`text-sm font-semibold mb-2 ${isToday ? "text-orange-900" : "text-amber-800"}`}>
                  {day}
                </div>
                <div className="space-y-1 overflow-y-auto max-h-20">
                  {daySubjects.map((subject) => (
                    <div
                      key={subject.id}
                      onClick={() => onSubjectClick(subject)}
                      className="text-xs bg-gradient-to-r from-orange-300 to-amber-300 text-amber-900 rounded-full px-3 py-1 cursor-pointer hover:from-orange-400 hover:to-amber-400 transition-all duration-200 truncate font-medium shadow-sm"
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
