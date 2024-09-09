import * as xml2js from 'xml2js';
import https from 'https';

export async function parseRssFeed(url: string): Promise<any> {
  // Check protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  console.log('Parsing URL:', url);

  try {
    const xmlRawData = await fetchXml(url);
    const parsedXmlData = await parseXml(xmlRawData);
    return JSON.stringify(parsedXmlData, null, 2);
  } catch (error) {
    console.error('RSS parsing error:', error);
    throw error;
  }
}

function fetchXml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Make a GET request to the RSS feed URL
    const req = https.get(url, { timeout: 10000 }, (res) => {
      let xmlRawData = '';
      
      // Accumulate data chunks as they arrive
      res.on('data', (chunk) => { xmlRawData += chunk; });
      
      // When all data has been received
      res.on('end', () => resolve(xmlRawData));
    });

    req.on('timeout', () => {
      req.abort();
      reject(new Error('Request timed out'));
    });

    // Handle any errors that occur during the request
    req.on('error', reject);
  });
}

function parseXml(xmlRawData: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // Create a new XML parser
    const parser = new xml2js.Parser();
    
    // Parse the XML data
    parser.parseString(xmlRawData, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}