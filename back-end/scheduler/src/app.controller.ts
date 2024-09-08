import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Mail } from './dto/mail.interface';

@Controller('email')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('welcome')
  async sendWelcomeEmail(@Body() data: Mail) {
    await this.appService.sendWelcomeEmail(data);
  }
  @Post('reset-password')
  async sendResetPasswordEmail(@Body() mail: Mail) {
    return this.appService.sendResetPasswordEmail(mail);
  }

  @Post('add')
  async addTestJobs(@Body('count') count: number) {
    return this.appService.addTestJobs(count);
  }
}
