export interface Article {
  id: string;
  title: string;
  content: string;
  publishDate: Date;
  author?: string;
  link: string;
  feedUrl: string;
}
