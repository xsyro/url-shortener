export interface UrlResponseBody {
  url: string;
  shortUrl: string;
  statusCode: number;
}

export interface UrlStatsResponseBody {
  shortUrlId: string;
  clicks: number;
  createdAt: Date;
  lastUpdatedAt: Date;
}

export type UrlBodyResponse = UrlResponseBody | Error;
