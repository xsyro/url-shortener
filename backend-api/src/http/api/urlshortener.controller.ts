import { Controller } from '@nestjs/common';
import { URLShortenerService } from '../services/urlshortener.services';
import { Get, Post, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: URLShortenerService) {}

  @Post('/api/encode')
  async encode(@Body() body: { url: string }) {
    const { url } = body;
    return this.urlShortenerService.generateShortUrl(url);
  }

  @Post('/api/decode')
  async decode(@Body('shortUrl') shortUrl: string) {
    return this.urlShortenerService.getOriginalUrl(shortUrl);
  }

  @Get('/api/statistic/:url_path')
  async statistic(@Param('url_path') urlPath: string) {
    return this.urlShortenerService.getStatistics(urlPath);
  }

  @Get('/api/list')
  async list(
    @Param('page') page: number = 1,
    @Param('limit') limit: number = 10,
  ) {
    return this.urlShortenerService.listAll(page, limit);
  }

  @Get('/:url_path')
  async redirect(@Param('url_path') urlPath: string, @Res() res: Response) {
    const longUrl = await this.urlShortenerService.getOriginalUrl(urlPath);
    if (longUrl) {
      return res.redirect(longUrl.url);
    } else {
      return res.status(HttpStatus.NOT_FOUND).send('URL not found');
    }
  }
}
