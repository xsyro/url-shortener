import { Controller } from '@nestjs/common';
import { URLShortenerService } from '../services/urlshortener.services';
import { Get, Post, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { validateUrl } from '../utils/validate.util';

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: URLShortenerService) { }

  @Post('/api/encode')
  async encode(@Body() body: { url: string }, @Res() res: Response) {
    const { url } = body;
    const resp = await this.urlShortenerService.createShortUrl(url);
    if ('statusCode' in resp) {
      return res.status(resp.statusCode).json(resp);
    } else {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
    }
  }

  @Post('/api/decode')
  async decode(@Body('shortUrl') shortUrl: string) {
    return this.urlShortenerService.getGeneratedUrl(shortUrl);
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
    const urlreponse = await this.urlShortenerService.getGeneratedUrl(urlPath);
    if (!validateUrl(urlPath)) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid URL');
    }
    if ('url' in urlreponse) {
      return res.redirect(301, urlreponse.url);
    } else {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Invalid response');
    }
  }
}
