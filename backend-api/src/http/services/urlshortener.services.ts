import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from 'src/db/entities/url.entity';

import { Repository } from 'typeorm';
import { validateUrl } from '../utils/validate.util';
import { ConfigService } from '@nestjs/config';
import { UrlIdGeneratorService } from './urlidgenerator.service';
import { CreateUrlBodyResponse } from '../payload/url.body';

@Injectable()
export class URLShortenerService {
  constructor(
    @InjectRepository(UrlEntity)
    private urlEntityRepository: Repository<UrlEntity>,
    private configService: ConfigService,
    private urlIdGeneratorService: UrlIdGeneratorService,
  ) {}

  async listAll(page: number = 1, limit: number = 10): Promise<UrlEntity[]> {
    const skip = (page - 1) * limit;
    return this.urlEntityRepository.find({
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

  async createShortUrl(originalUrl: string): Promise<CreateUrlBodyResponse> {
    if (!validateUrl(originalUrl)) {
      return new Error('Invalid URL');
    }

    const baseUrl = this.configService.get<string>('BASE_URL');

    const existingEntry = await this.urlEntityRepository.findOneBy({
      url: originalUrl,
    });
    if (existingEntry) {
      return {
        url: existingEntry.url,
        shortUrl: `${baseUrl}/${existingEntry.shortUrlId}`,
        clicks: existingEntry.clicks,
        statusCode: 200,
      };
    }
    const shortUrlId = await this.urlIdGeneratorService.generateUniqueId();
    const newEntry = {
      url: originalUrl,
      shortUrlId: shortUrlId,
      clicks: 0,
      createdAt: new Date(),
    };
    await this.urlEntityRepository.save(newEntry);
    return {
      url: newEntry.url,
      shortUrl: `${baseUrl}/${newEntry.shortUrlId}`,
      clicks: newEntry.clicks,
      statusCode: 201,
    };
  }

  async decode(shortUrl: string): Promise<string | null> {
    // const mapping = this.urlDatabase.get(shortUrl);
    // return mapping ? mapping.originalUrl : null;
    console.log(shortUrl);
    return null;
  }
}
