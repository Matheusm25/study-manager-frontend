import { getHTTPServerClient } from "./client/server-client";
import { INote } from "./interfaces/note";

export class NoteService {
  public static async addNote(subjectUuid: string, content: string): Promise<INote> {
    const token = localStorage.getItem("api-token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const client = getHTTPServerClient({ token });
    const response = await client.post("/note", { subjectUuid, content });

    if (response.status === 201) {
      const note: INote = {
        ...response.data.note,
        createdAt: new Date(response.data.note.createdAt),
      };
      return note;
    } else {
      throw new Error(response.data.error || "Failed to add note");
    }
  }
}