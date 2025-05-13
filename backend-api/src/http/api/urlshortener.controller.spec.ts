import { HttpStatus } from '@nestjs/common';
import { URLShortenerService } from '../services/urlshortener.services';
import { UrlShortenerController } from './urlshortener.controller';

describe('UrlShortenerController - encode', () => {
  let urlShortenerService: URLShortenerService;
  let urlShortenerController: UrlShortenerController;

  beforeEach(() => {
    urlShortenerService = {
      createShortUrl: jest.fn(),
    } as any;
    urlShortenerController = new UrlShortenerController(urlShortenerService);
  });

  it('should return a short URL when encode is successful', async () => {
    const mockResponse = {
      url: 'http://example.com',
      shortUrl: 'http://short.url/abc123',
      statusCode: 200,
    };
    jest
      .spyOn(urlShortenerService, 'createShortUrl')
      .mockResolvedValue(mockResponse);

    const reqBody = { url: 'http://example.com' };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await urlShortenerController.encode(reqBody, res);

    expect(urlShortenerService.createShortUrl).toHaveBeenCalledWith(
      reqBody.url,
    );
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(res.json).toHaveBeenCalledWith(mockResponse);
  });

  it('should return an error response when encode fails', async () => {
    const mockErrorResponse = new Error('Invalid URL');
    jest
      .spyOn(urlShortenerService, 'createShortUrl')
      .mockResolvedValue(mockErrorResponse);

    const reqBody = { url: 'invalid-url' };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await urlShortenerController.encode(reqBody, res);

    expect(urlShortenerService.createShortUrl).toHaveBeenCalledWith(
      reqBody.url,
    );
    // expect(res.status).toHaveBeenCalledWith(mockErrorResponse.statusCode);
    expect(res.json).toHaveBeenCalledWith(mockErrorResponse);
  });
});

describe('UrlShortenerController - decode', () => {
  let urlShortenerService: URLShortenerService;
  let urlShortenerController: UrlShortenerController;

  beforeEach(() => {
    urlShortenerService = {
      getGeneratedUrl: jest.fn(),
    } as any;
    urlShortenerController = new UrlShortenerController(urlShortenerService);
  });

  it('should return the original URL when decode is successful', async () => {
    const mockResponse = {
      url: 'http://example.com',
      shortUrl: 'http://short.url/abc123',
      statusCode: 200,
    };
    jest
      .spyOn(urlShortenerService, 'getGeneratedUrl')
      .mockResolvedValue(mockResponse);

    const reqBody = { shortUrl: 'http://short.url/abc123' };

    const result = await urlShortenerController.decode(reqBody);

    expect(urlShortenerService.getGeneratedUrl).toHaveBeenCalledWith(
      reqBody.shortUrl,
    );
    expect(result).toEqual(mockResponse);
  });

  it('should return an error response when decode fails', async () => {
    const mockErrorResponse = new Error('URL not found');
    jest
      .spyOn(urlShortenerService, 'getGeneratedUrl')
      .mockResolvedValue(mockErrorResponse);

    const reqBody = { shortUrl: 'http://short.url/invalid' };

    const result = await urlShortenerController.decode(reqBody);

    expect(urlShortenerService.getGeneratedUrl).toHaveBeenCalledWith(
      reqBody.shortUrl,
    );
    expect(result).toEqual(mockErrorResponse);
  });
});
