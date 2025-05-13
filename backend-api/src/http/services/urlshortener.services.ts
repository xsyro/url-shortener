import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from 'src/db/entities/url.entity';

import { Repository } from 'typeorm';
import { validateUrl } from '../utils/validate.util';
import { ConfigService } from '@nestjs/config';
import { UrlIdGeneratorService } from './urlidgenerator.service';
import { UrlBodyResponse, UrlStatsResponseBody } from '../payload/url.body';

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

  async getStatistics(urlPath: string): Promise<UrlStatsResponseBody | null> {
    const mapping = await this.urlEntityRepository.findOne({
      where: [{ shortUrlId: urlPath }, { shortUrl: urlPath }],
    });
    if (mapping) {
      return {
        shortUrlId: mapping.shortUrlId,
        clicks: mapping.clicks,
        createdAt: mapping.createdAt,
        lastUpdatedAt: mapping.updatedAt,
      };
    }
    return null;
  }

  async createShortUrl(originalUrl: string): Promise<UrlBodyResponse> {
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
        statusCode: 200,
      };
    }
    const shortUrlId = await this.urlIdGeneratorService.generateUniqueId();
    const newEntry = {
      url: originalUrl,
      shortUrlId: shortUrlId,
      shortUrl: `${baseUrl}/${shortUrlId}`,
      createdAt: new Date(),
    };
    await this.urlEntityRepository.save(newEntry);
    return {
      url: newEntry.url,
      shortUrl: `${baseUrl}/${newEntry.shortUrlId}`,
      statusCode: 201,
    };
  }

  async getGeneratedUrl(shortUrl: string): Promise<UrlBodyResponse | Error> {
    const mapping = await this.urlEntityRepository.findOne({
      where: [{ shortUrlId: shortUrl }, { shortUrl: shortUrl }],
    });
    if (mapping) {
      // Increment the click count
      await this.urlEntityRepository.increment(
        { shortUrlId: mapping.shortUrlId },
        'clicks',
        1,
      );
      return {
        url: mapping.url,
        shortUrl: `${this.configService.get<string>('BASE_URL')}/${mapping.shortUrlId}`,
        statusCode: 200,
      };
    }
    return new Error('URL not found');
  }
}
