export interface Article {
  _id?: string;
  title: string;
  pubDate: Date;
  description?:string;
  content?: string;
  creator?: string;
  link: string;
}
