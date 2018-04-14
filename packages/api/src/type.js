export type Question = {
  id: string,
  text: string,
}

export type SessionQuestion = {
  questionId: string,
  answer: boolean | null,
  date_answer: number,
}

export type Session = {
  user_id: string,
  id: string,
  date_created: number,
  questions: SessionQuestion[],
}
