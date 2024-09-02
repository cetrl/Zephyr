
import { Feed } from './models/feed.model';
import { Article } from './models/article.model';

export const MOCK_FEEDS: Feed[] = [
  {
    id: '1',
    title: 'Tech News',
    url: 'https://technews.com/rss'
  },
  {
    id: '2',
    title: 'Science Daily',
    url: 'https://sciencedaily.com/rss'
  },
  {
    id: '3',
    title: 'World News',
    url: 'https://worldnews.com/rss'
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'New AI Breakthrough',
    content: 'Researchers have made a significant breakthrough in AI technology...',
    publishDate: new Date('2023-08-27T15:00:00Z'),
    author: 'John Doe',
    link: 'https://technews.com/ai-breakthrough'
  },
  {
    id: '2',
    title: '5G Revolution',
    content: '5G technology is set to revolutionize mobile communications...',
    publishDate: new Date('2023-08-26T14:30:00Z'),
    author: 'Jane Smith',
    link: 'https://technews.com/5g-revolution'
  },
  {
    id: '3',
    title: 'Mars Exploration Update',
    content: 'NASA\'s latest Mars rover has made an exciting discovery...' ,
    publishDate: new Date('2023-08-28T08:00:00Z'),
    author: 'Emily Johnson',
    link: 'https://sciencedaily.com/mars-exploration'
  },
  {
    id: '4',
    title: 'Global Climate Conference',
    content: 'World leaders gather to discuss urgent climate action...',
    publishDate: new Date('2023-08-27T19:00:00Z'),
    author: 'Michael Brown',
    link: 'https://worldnews.com/climate-conference'
  }
];
