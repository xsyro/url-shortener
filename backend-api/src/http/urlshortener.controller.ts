import { Controller } from '@nestjs/common';
import { URLShortenerService } from './services/urlshortener.services';

@Controller()
export class UrlShortenerController {
  constructor(private readonly appService: URLShortenerService) {}
}
