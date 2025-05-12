import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class HealthController {
  @Get('/health/liveliness')
  redirect(@Res() res: Response) {
    res.status(200).json({ status: "Thank you, I'm living healthy." });
  }
}
