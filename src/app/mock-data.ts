import { Feed } from './models/feed.model';
import { Article } from './models/article.model';

export const MOCK_FEEDS: Feed[] = [
  {
    id: '1',
    title: 'Cyberfeminism Index',
    url: 'https://cyberfeminismindex.com/',
  },
  {
    id: '2',
    title: 'Legacy Russell',
    url: 'https://legacyrussell.com/',
  },
  {
    id: '3',
    title: 'Rhizome',
    url: 'https://rhizome.org/',
  },
  {
    id: '4',
    title: 'Mindy Seu',
    url: 'https://mindyseu.com/',
  },
  {
    id: '5',
    title: 'The New Museum',
    url: 'https://www.newmuseum.org/',
  },
  {
    id: '6',
    title: 'Affordance.info',
    url: 'https://affordance.framasoft.org/feed/',
  },
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Cyberfeminism Index',
    content:
      'Cyberfeminism Index, initiated by designer, researcher, and artist Mindy Seu, is a collection of over 700 short entries of artistic, theoretical, and technological works related to cyberfeminism from 1991 to 2020. It spans three decades of works from around the world, including excerpts, lists of artists and activists, and a variety of media forms.',
    publishDate: new Date('2020-01-01T00:00:00Z'),
    author: 'Mindy Seu',
    feedUrl: 'https://cyberfeminismindex.com/',
    link: 'https://cyberfeminismindex.com/',
  },
  {
    id: '2',
    title: 'A Cyberfeminist Manifesto for the 21st Century',
    content:
      'Created by VNS Matrix in 1991, this manifesto is considered one of the earliest and most influential cyberfeminist works. It proclaimed, "we are the modern cunt / positive anti reason / unbounded unleashed unforgiving / we see art with our cunt we make art with our cunt / we believe in jouissance madness holiness and poetry / we are the virus of the new world disorder / rupturing the symbolic from within / saboteurs of big daddy mainframe / the clitoris is a direct line to the matrix."',
    publishDate: new Date('1991-01-01T00:00:00Z'),
    author: 'VNS Matrix',
    feedUrl:
      'https://cyberfeminismindex.com/1991-a-cyberfeminist-manifesto-for-the-21st-century/',
    link: 'https://cyberfeminismindex.com/1991-a-cyberfeminist-manifesto-for-the-21st-century/',
  },
  {
    id: '3',
    title: 'Glitch Feminism: A Manifesto',
    content:
      'Legacy Russell\'s manifesto, published in 2020, argues for the use of the digital as a means of refuting systemic oppression. Russell introduces the concept of "glitch feminism" as a new framework for gender, identity, and the body in the age of the Internet. The book explores how error, glitch, and miscommunication can be powerful tools of resistance.',
    publishDate: new Date('2020-09-29T00:00:00Z'),
    author: 'Legacy Russell',
    feedUrl: 'https://cyberfeminismindex.com/2020-glitch-feminism/',
    link: 'https://cyberfeminismindex.com/2020-glitch-feminism/',
  },
  {
    id: '4',
    title: 'Xenofeminism: A Politics for Alienation',
    content:
      'The Laboria Cuboniks collective published this manifesto in 2015, proposing a new approach to feminism in the age of technology. Xenofeminism advocates for gender abolition, techno-materialism, and anti-naturalism. It calls for the repurposing of existing technologies for progressive gender political ends.',
    publishDate: new Date('2015-06-11T00:00:00Z'),
    author: 'Laboria Cuboniks',
    feedUrl:
      'https://cyberfeminismindex.com/2015-xenofeminism-a-politics-for-alienation/',
    link: 'https://cyberfeminismindex.com/2015-xenofeminism-a-politics-for-alienation/',
  },
  {
    id: '5',
    title: 'Cyberfeminism Is Not Dead',
    content:
      'This article by Claire L. Evans, published in 2014, reflects on the history and ongoing relevance of cyberfeminism. Evans argues that while the term may have fallen out of fashion, the ideas and goals of cyberfeminism remain crucial in the contemporary digital landscape. She calls for a renewed engagement with cyberfeminist principles in the face of persistent gender inequalities in tech.',
    publishDate: new Date('2014-09-13T00:00:00Z'),
    author: 'Claire L. Evans',
    feedUrl: 'https://cyberfeminismindex.com/2014-cyberfeminism-is-not-dead/',
    link: 'https://cyberfeminismindex.com/2014-cyberfeminism-is-not-dead/',
  },
  {
    id: '6',
    title: 'The Cyborg Manifesto',
    content:
      'Donna Haraway\'s seminal 1985 essay "A Cyborg Manifesto" is a critical text in cyberfeminism. Haraway uses the metaphor of the cyborg to challenge traditional notions of gender, identity, and the human-technology relationship. The manifesto has been hugely influential in feminist theory, posthumanism, and science and technology studies.',
    publishDate: new Date('1985-01-01T00:00:00Z'),
    author: 'Donna Haraway',
    feedUrl: 'https://cyberfeminismindex.com/1985-a-cyborg-manifesto/',
    link: 'https://cyberfeminismindex.com/1985-a-cyborg-manifesto/',
  },
];
