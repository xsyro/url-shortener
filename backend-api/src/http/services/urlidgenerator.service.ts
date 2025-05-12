import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { UrlEntity } from 'src/db/entities/url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UrlIdGeneratorService {
  constructor(
    @InjectRepository(UrlEntity)
    private urlEntityRepository: Repository<UrlEntity>,
  ) {}

  // creating short url using nanoid
  async generateUniqueId(): Promise<string> {
    const urlId = nanoid(6);
    const existingEntry = await this.urlEntityRepository.findOneBy({
      shortUrlId: urlId,
    });
    if (existingEntry) {
      return this.generateUniqueId();
    }
    return urlId;
  }
}
