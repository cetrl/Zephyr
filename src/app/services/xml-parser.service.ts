import { Injectable } from '@angular/core';
import { parseString } from 'xml2js';
import { Observable, from } from 'rxjs';

interface RssItem {
  title: string[];
  link: string[];
  description: string[];
  pubDate?: string[];
  'dc:date'?: string[];
}

interface AtomEntry {
  title: string[];
  link: { $: { href: string } }[];
  summary?: string[];
  updated: string[];
}

@Injectable({
  providedIn: 'root'
})
export class XmlParserService {
  constructor() { }

  parseXML(xml: string): Observable<any> {
    return from(new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }));
  }

  detectFeedType(parsedXml: any): string {
    if (parsedXml.rss && parsedXml.rss.$.version === '2.0') {
      return 'RSS 2.0';
    } else if (parsedXml.feed && parsedXml.feed.$['xmlns'] === 'http://www.w3.org/2005/Atom') {
      return 'Atom';
    } else if (parsedXml['rdf:RDF']) {
      return 'RSS 1.0';
    }
    return 'Unknown';
  }

  parseFeed(parsedXml: any, feedType: string): any[] {
    switch (feedType) {
      case 'RSS 2.0':
        return this.parseRSS2(parsedXml.rss.channel[0]);
      case 'Atom':
        return this.parseAtom(parsedXml.feed);
      case 'RSS 1.0':
        return this.parseRSS1(parsedXml['rdf:RDF']);
      default:
        throw new Error('Unsupported feed format');
    }
  }

  private parseRSS2(channel: { item: RssItem[] }): any[] {
    return channel.item.map((item: RssItem) => ({
      title: item.title[0],
      link: item.link[0],
      description: item.description[0],
      pubDate: new Date(item.pubDate?.[0] || '')
    }));
  }

  private parseAtom(feed: { entry: AtomEntry[] }): any[] {
    return feed.entry.map((entry: AtomEntry) => ({
      title: entry.title[0],
      link: entry.link[0].$.href,
      description: entry.summary ? entry.summary[0] : '',
      pubDate: new Date(entry.updated[0])
    }));
  }

  private parseRSS1(rdf: { item: RssItem[] }): any[] {
    return rdf.item.map((item: RssItem) => ({
      title: item.title[0],
      link: item.link[0],
      description: item.description[0],
      pubDate: new Date(item['dc:date']?.[0] || item.pubDate?.[0] || '')
    }));
  }
}
