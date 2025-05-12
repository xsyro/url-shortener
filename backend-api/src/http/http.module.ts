import { Module } from '@nestjs/common';
import { UrlShortenerController } from './api/urlshortener.controller';
import { URLShortenerService } from './services/urlshortener.services';
import { DbModule } from 'src/db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './api/health.controller';
import { UrlEntity } from 'src/db/entities/url.entity';
import { UrlIdGeneratorService } from './services/urlidgenerator.service';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([UrlEntity])],
  controllers: [UrlShortenerController, HealthController],
  providers: [UrlIdGeneratorService, URLShortenerService],
})
export class HttpModule {}
