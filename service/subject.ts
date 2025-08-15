import { getHTTPServerClient } from "./client/server-client";
import { INote } from "./interfaces/note";
import { ICreateSubjectRequest, ISubject } from "./interfaces/subject";

export class SubjectService {
  public static async getSubjects(date?: Date): Promise<ISubject[]> {
    const token = localStorage.getItem("api-token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const client = getHTTPServerClient({ token });
    const response = await client.get("/subject", {
      headers: { 'instance-notes': "true" },
      params: {
        month: date ? date.getMonth() + 1 : undefined,
        year: date ? date.getFullYear() : undefined,
      }
    });

    if (response.status === 200) {
      return response.data.map((s: ISubject) => ({
        ...s,
        studyDate: new Date(s.studyDate),
        notes: s.notes?.map((note: INote) => ({
          ...note,
          createdAt: new Date(note.createdAt),
        })),
      }));
    } else {
      throw new Error(response.data.error || "Failed to fetch subjects");
    }
  }

  public static async addSubject(subject: ICreateSubjectRequest): Promise<Array<ISubject>> {
    const token = localStorage.getItem("api-token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const client = getHTTPServerClient({ token });
    const response = await client.post("/subject", {
      addRevisionsInDays: [1, 7, 30],
      ...subject,
    });

    if (response.status === 201) {
      return response.data.subjects.map((s: ISubject) => ({
        ...s,
        studyDate: new Date(s.studyDate),
        notes: s.notes?.map((note: INote) => ({
          ...note,
          createdAt: new Date(note.createdAt),
        })),
      }));
    } else {
      throw new Error(response.data.error || "Failed to add subject");
    }
  }

  public static async editSubject(subjectData: ISubject): Promise<ISubject> {
    const token = localStorage.getItem("api-token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const client = getHTTPServerClient({ token });
    const response = await client.put(`/subject/${subjectData.uuid}`, subjectData);

    if (response.status === 200) {
      return subjectData;
    } else {
      throw new Error(response.data.error || "Failed to edit subject");
    }
  }

  public static async deleteSubject(subjectId: string): Promise<void> {
    const token = localStorage.getItem("api-token");
    if (!token) {
      throw new Error("User not authenticated");
    }

    const client = getHTTPServerClient({ token });
    const response = await client.delete(`/subject/${subjectId}`);

    if (response.status !== 204) {
      throw new Error(response.data.error || "Failed to delete subject");
    }
  }
}