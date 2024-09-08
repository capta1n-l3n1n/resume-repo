import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Mail } from './dto/mail.interface';
import { Job } from './schema/job.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('mail') private readonly mailQueue: Queue,
    @InjectModel(Job.name) private readonly jobModel: Model<Job>,
  ) {}

  async sendWelcomeEmail(data: Mail) {
    const job = await this.mailQueue.add('welcome', data);
    await this.jobModel.create({
      jobId: job.id,
      type: 'welcome',
      data,
      status: 'pending',
    });
    return { jobId: job.id };
  }

  async sendResetPasswordEmail(data: Mail) {
    const job = await this.mailQueue.add('reset-password', data);
    await this.jobModel.create({
      jobId: job.id,
      type: 'reset-password',
      data,
      status: 'pending',
    });
    return { jobId: job.id };
  }

  async addTestJobs(count: number) {
    for (let i = 0; i < count; i++) {
      await this.mailQueue.add('test-job', { jobNumber: i });
    }
    return { message: `${count} jobs added to the queue` };
  }
}
