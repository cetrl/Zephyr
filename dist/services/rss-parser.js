"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRssFeed = parseRssFeed;
const xml2js = __importStar(require("xml2js"));
const https_1 = __importDefault(require("https"));
function parseRssFeed(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check protocol
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        try {
            const xmlRawData = yield fetchXml(url);
            const parsedXmlData = yield parseXml(xmlRawData);
            return JSON.stringify(parsedXmlData, null, 2);
        }
        catch (error) {
            console.error('RSS parsing error:', error);
            throw error;
        }
    });
}
function fetchXml(url) {
    return new Promise((resolve, reject) => {
        // Make a GET request to the RSS feed URL
        const req = https_1.default.get(url, { timeout: 10000 }, (res) => {
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
function parseXml(xmlRawData) {
    return new Promise((resolve, reject) => {
        // Create a new XML parser
        const parser = new xml2js.Parser();
        // Parse the XML data
        parser.parseString(xmlRawData, (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    });
}
