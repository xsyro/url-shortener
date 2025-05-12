import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UrlShortenerHttpModule } from './http/http.module';
import environment from './environment';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [environment], isGlobal: true }),
    DbModule,
    UrlShortenerHttpModule,
  ],
})
export class AppModule {}
