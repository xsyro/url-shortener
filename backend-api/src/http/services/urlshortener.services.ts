import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import crypto from 'crypto';

import { UrlEntry } from 'src/db/entities/url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class URLShortenerService {
  constructor(
    @InjectRepository(UrlEntry)
    private urlEntryRepository: Repository<UrlEntry>,
  ) {}

  async listAll(page: number = 1, limit: number = 10): Promise<UrlEntry[]> {
    const skip = (page - 1) * limit;
    return this.urlEntryRepository.find({
      order: {
        createdAt: 'DESC',
      },
      skip: skip,
      take: limit,
    });
  }

  async getStatistics(urlPath: string) {
    console.log(urlPath);
    throw new Error('Method not implemented.');
  }

  async generateShortUrl(originalUrl: string): Promise<UrlEntry> {
    const hash = crypto.createHash('sha256').update(originalUrl).digest('hex');
    const shortUrl = hash.substring(0, 6);
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
