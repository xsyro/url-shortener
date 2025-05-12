import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return liveliness status', async () => {
    const response = await request(app.getHttpServer()).get(
      '/health/liveliness',
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "Thank you, I'm living healthy." });
  });
});
