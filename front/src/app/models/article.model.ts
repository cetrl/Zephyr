export interface Article {
  _id?: string;
  title: string;
  content: string;
  pubDate: Date;
  author?: string;
  link: string;
  description?:string;
}
