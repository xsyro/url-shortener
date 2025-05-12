export interface UrlResponseBody {
  url: string;
  shortUrl: string;
  clicks: number;
  statusCode: number;
}

export type CreateUrlBodyResponse = UrlResponseBody | Error;
