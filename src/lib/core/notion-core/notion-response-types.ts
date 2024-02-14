export type NBlogPostRow = {
  id?: string
  title: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  date: { date: { start: string } }
}
