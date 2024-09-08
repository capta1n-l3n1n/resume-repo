import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailProcessor } from './email.processor';
import { Job, JobSchema } from './schema/job.schema';
import { ConfigModule } from '@nestjs/config';
import { JobScheduler } from './job.scheduler';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:fxCJBa8SF64scu@35.240.171.42:23000/jobs-nest?authSource=admin',
    ),
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379,
        maxRetriesPerRequest: null, // Allow unlimited retries
        retryStrategy: (times) => {
          console.log(`Retrying Redis connection, attempt number ${times}`);
          return Math.min(times * 50, 2000);
        },
      },
    }),
    BullModule.registerQueue({
      name: 'mail',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.example.com',
        port: 587,
        auth: {
          user: 'username',
          pass: 'password',
        },
      },
      defaults: {
        from: 'No Reply <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
      },
    }),
    ConfigModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, EmailProcessor, JobScheduler],
})
export class AppModule {}
