export interface Pet {
  _id: string;
  url: string;
  title: string;
  description: string;
  comments: any;
  postedBy: number;
}

export type Pets = Array<Pet>;
