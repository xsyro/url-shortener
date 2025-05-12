import { Module } from '@nestjs/common';
import { UrlShortenerController } from './urlshortener.controller';
import { URLShortenerService } from './services/urlshortener.services';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [UrlShortenerController],
  providers: [URLShortenerService],
})
export class UrlShortenerHttpModule {}
