export interface Comentario {
  text: string,
  postedBy: string,
  date: Date
}

export type Comentarios = Array<Comentario>;
