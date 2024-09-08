import { Processor, Process } from '@nestjs/bull';
import { Job as BullJob } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './schema/job.schema';
import { Mail } from './dto/mail.interface';
import { Logger } from '@nestjs/common';

@Processor('mail')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(
    private readonly mailService: MailerService,
    @InjectModel(Job.name) private readonly jobModel: Model<Job>,
  ) {}

  @Process({ name: 'welcome', concurrency: 50 })
  async sendWelcomeEmail(job: BullJob<Mail>) {
    const { data } = job;
    // this.logger.log(`Processing job ${job.id}: Sending welcome email`);
    // await this.jobModel.updateOne({ jobId: job.id }, { status: 'processing' });
    try {
      await this.mailService.sendMail({
        ...data,
        subject: 'Welcome',
        template: 'welcome',
        context: {
          user: data.user,
        },
      });
      await this.jobModel.updateOne({ jobId: job.id }, { status: 'completed' });
      this.logger.log(`Job ${job.id} completed: Welcome email sent`);
    } catch (error) {
      await this.jobModel.updateOne({ jobId: job.id }, { status: 'failed' });
      this.logger.error(`Job ${job.id} failed: ${error.message}`);
    }
  }

  @Process({ name: 'reset-password', concurrency: 5 })
  async sendResetPasswordEmail(job: BullJob<Mail>) {
    const { data } = job;
    this.logger.log(`Processing job ${job.id}: Sending reset password email`);
    await this.jobModel.updateOne({ jobId: job.id }, { status: 'processing' });
    try {
      await this.mailService.sendMail({
        ...data,
        subject: 'Reset password',
        template: 'reset-password',
        context: {
          user: data.user,
        },
      });
      await this.jobModel.updateOne({ jobId: job.id }, { status: 'completed' });
      this.logger.log(`Job ${job.id} completed: Reset password email sent`);
    } catch (error) {
      await this.jobModel.updateOne({ jobId: job.id }, { status: 'failed' });
      this.logger.error(`Job ${job.id} failed: ${error.message}`);
    }
  }

  @Process({ name: 'test-job', concurrency: 50 }) // Set high concurrency
  async handleTestJob(job: BullJob<any>) {
    const start = new Date();
    this.logger.log(
      `Started processing job ${
        job.id
      } at ${start.toISOString()} with data: ${JSON.stringify(job.data)}`,
    );

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const end = new Date();
    this.logger.log(`Completed job ${job.id} at ${end.toISOString()}`);
  }
}
