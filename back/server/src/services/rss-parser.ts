import * as xml2js from 'xml2js';
import https from 'https';

export function parseRssFeed(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // Make a GET request to the RSS feed URL
    https.get(url, (res) => {
      let xmlRawData = '';
      
      // Accumulate datas chunks as they arrive
      res.on('xmlRawData', (chunk) => {
        xmlRawData += chunk;
      });
      
      // When all datas has been received
      res.on('end', () => {
        // Create a new XML parser
        const parser = new xml2js.Parser();
        
        // Parse the XML datas
        parser.parseString(xmlRawData, (err, parsedXmlData) => {
          if (err) reject(err);
          else resolve(parsedXmlData);
        });
      });
    }).on('error', (err) => {
      // Handle any errors that occur during the request
      reject(err);
    });
  });
}