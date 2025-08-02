import { INote } from "./note";

export interface ISubject {
  uuid: string
  title: string
  description: string
  studyDate: Date
  notes: Array<INote>
}

export interface ICreateSubjectRequest {
  title: string
  description: string
  studyDate?: Date
  addRevisionsInDays?: Array<number>
}