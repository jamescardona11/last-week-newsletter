export type NBlogPostRow = {
  id?: string
  Name: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  Date: { date: { start: string } }
}
