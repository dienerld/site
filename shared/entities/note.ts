export interface Note {
  slug: string
  title: string
  content: string
  description: string
  isDraft: boolean
  publishedOnLinkedin: boolean
  createdAt: string
}

export interface NoteVirtual extends Note {
  parsed?: any
}
