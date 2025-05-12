import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import crypto from 'crypto';

import { UrlEntry } from 'src/db/entities/urlentries.entities';
import { Repository } from 'typeorm';

@Injectable()
export class URLShortenerService {
  constructor(
    @InjectRepository(UrlEntry)
    private urlEntryRepository: Repository<UrlEntry>,
  ) {}

  async generateShortUrl(originalUrl: string): Promise<UrlEntry> {
    const hash = crypto.createHash('sha256').update(originalUrl).digest('hex');
    const shortUrl = hash.substring(0, 8);
    const existingEntry = this.urlEntryRepository.findOneBy({
      shortUrl: shortUrl,
    });
    if (existingEntry) {
      return this.generateShortUrl(originalUrl);
    }
    const newEntry = this.urlEntryRepository.create({
      url: originalUrl,
      shortUrl: shortUrl,
      clicks: 0,
      createdAt: new Date(),
    });
    this.urlEntryRepository.save(newEntry);
    return newEntry;
  }

  async getOriginalUrl(shortUrl: string): Promise<UrlEntry | null> {
    // const mapping = this.urlDatabase.get(shortUrl);
    // return mapping ? mapping.originalUrl : null;
    console.log(shortUrl);
    return null;
  }
}
