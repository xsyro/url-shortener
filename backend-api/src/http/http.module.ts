import { Module } from '@nestjs/common';
import { UrlShortenerController } from './api/urlshortener.controller';
import { URLShortenerService } from './services/urlshortener.services';
import { DbModule } from 'src/db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntry } from 'src/db/entities/url.entity';
import { HealthController } from './api/health.controller';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([UrlEntry])],
  controllers: [UrlShortenerController, HealthController],
  providers: [URLShortenerService],
})
export class HttpModule {}
