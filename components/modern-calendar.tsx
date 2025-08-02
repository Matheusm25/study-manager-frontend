"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react"
import type { Subject } from "@/app/dashboard/page"

interface CalendarProps {
  currentDate: Date
  onDateChange: (date: Date) => void
  subjects: Subject[]
  onSubjectClick: (subject: Subject) => void
  onDayClick: (date: Date) => void
  username: string
}

export default function ModernCalendar({
  currentDate,
  onDateChange,
  subjects,
  onSubjectClick,
  onDayClick,
  username,
}: CalendarProps) {
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

  const handleDayClick = (day: number, e: React.MouseEvent) => {
    // Check if the click was on a subject card
    const target = e.target as HTMLElement
    if (target.closest("[data-subject-card]")) {
      return // Don't open day modal if clicking on a subject card
    }

    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    onDayClick(dayDate)
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const today = new Date()
  const isCurrentMonth =
    today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear()

  return (
    <Card className="bg-bg-surface/95 backdrop-blur-xl border-0 shadow-2xl shadow-pastel-muted-blue-200/20 overflow-hidden h-full">
      {/* Compact Modern Header */}
      <CardHeader className="bg-gradient-to-r from-pastel-muted-blue-500 via-pastel-soft-pink-400 to-pastel-lavender-500 text-white relative overflow-hidden py-4">
        <div className="absolute inset-0 bg-gradient-to-r from-pastel-muted-blue-400/20 via-transparent to-pastel-soft-pink-400/20"></div>
        <div className="relative z-10">
          {/* Single Row Layout */}
          <div className="flex items-center justify-between">
            {/* Left: Calendar Icon + Month/Year */}
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold tracking-tight">{monthNames[currentDate.getMonth()]}</CardTitle>
                <p className="text-pastel-muted-blue-100 font-medium text-sm">{currentDate.getFullYear()}</p>
              </div>
            </div>

            {/* Center: Username Schedule */}
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-tight">{username} Schedule</h1>
              <p className="text-pastel-muted-blue-100 font-medium text-sm">Manage your study sessions</p>
            </div>

            {/* Right: Subject Count + Navigation */}
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                {subjects.length} subjects
              </Badge>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth("prev")}
                  className="text-white hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-200 hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateMonth("next")}
                  className="text-white hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-200 hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
      </CardHeader>

      <CardContent className="p-8">
        {/* Modern Day Headers */}
        <div className="grid grid-cols-7 gap-3 mb-8">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
            <div
              key={day}
              className={`p-4 text-center text-sm font-bold rounded-2xl transition-all duration-200 ${
                index === 0 || index === 6
                  ? "text-pastel-soft-pink-600 bg-gradient-to-br from-pastel-soft-pink-50 to-pastel-cream-50"
                  : "text-pastel-muted-blue-700 bg-gradient-to-br from-pastel-muted-blue-100 to-pastel-sage-100"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Modern Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 overflow-hidden">
          {emptyDays.map((day) => (
            <div key={`empty-${day}`} className="h-28"></div>
          ))}

          {days.map((day) => {
            const daySubjects = getSubjectsForDay(day)
            const isToday = isCurrentMonth && today.getDate() === day
            const hasSubjects = daySubjects.length > 0

            return (
              <div
                key={day}
                onClick={(e) => handleDayClick(day, e)}
                className={`h-28 rounded-2xl p-3 transition-all duration-300 hover:shadow-xl group relative overflow-hidden cursor-pointer ${
                  isToday
                    ? "bg-gradient-to-br from-pastel-muted-blue-400 to-pastel-lavender-500 text-white shadow-lg shadow-pastel-muted-blue-300/50"
                    : hasSubjects
                      ? "bg-gradient-to-br from-pastel-sage-50 to-pastel-cream-50 border-2 border-pastel-sage-200 hover:border-pastel-sage-300"
                      : "bg-gradient-to-br from-bg-surface to-pastel-muted-blue-50/30 border border-border-subtle hover:border-pastel-muted-blue-200"
                }`}
              >
                {/* Day Number */}
                <div
                  className={`text-sm font-bold mb-2 flex items-center justify-between ${
                    isToday ? "text-white" : "text-text-primary"
                  }`}
                >
                  <span>{day}</span>
                  {hasSubjects && !isToday && <Sparkles className="w-3 h-3 text-pastel-sage-500" />}
                  {isToday && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
                </div>

                {/* Subject Cards */}
                <div className="space-y-1 overflow-hidden max-h-16">
                  {daySubjects.map((subject, index) => (
                    <div
                      key={subject.id}
                      data-subject-card
                      onClick={(e) => {
                        e.stopPropagation()
                        onSubjectClick(subject)
                      }}
                      className={`text-xs rounded-lg px-2 py-1 cursor-pointer transition-all duration-200 hover:scale-105 font-medium shadow-sm transform hover:shadow-md overflow-hidden ${
                        isToday
                          ? "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                          : index % 2 === 0
                            ? "bg-gradient-to-r from-pastel-sage-400 to-pastel-muted-blue-400 text-white hover:from-pastel-sage-500 hover:to-pastel-muted-blue-500"
                            : "bg-gradient-to-r from-pastel-muted-blue-400 to-pastel-sage-400 text-white hover:from-pastel-muted-blue-500 hover:to-pastel-sage-500"
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <div className="truncate">{subject.title}</div>
                    </div>
                  ))}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
