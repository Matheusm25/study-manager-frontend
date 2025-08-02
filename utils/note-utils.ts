import type { Note } from "@/app/dashboard/page"

export const addNote = (subjectId: string, content: string): Note => {
  const newNote: Note = {
    id: Date.now().toString(),
    subjectId,
    content,
    createdDate: new Date(),
  }

  // Retrieve existing notes from localStorage
  const storedNotes = localStorage.getItem("notes")
  let existingNotes: Note[] = []

  if (storedNotes) {
    existingNotes = JSON.parse(storedNotes).map((n: any) => ({
      ...n,
      createdDate: new Date(n.createdDate),
    }))
  }

  // Add the new note to the existing notes
  const updatedNotes = [...existingNotes, newNote]

  // Store the updated notes back in localStorage
  localStorage.setItem("notes", JSON.stringify(updatedNotes))

  return newNote
}
