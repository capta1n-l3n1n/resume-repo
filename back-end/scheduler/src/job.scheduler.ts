import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Job } from './schema/job.schema';

@Injectable()
export class JobScheduler {
  private readonly logger = new Logger(JobScheduler.name);

  constructor(
    @InjectModel(Job.name) private readonly jobModel: Model<Job>,
    @InjectQueue('mail') private readonly mailQueue: Queue,
  ) {}

  @Cron('*/10 * * * * *') // Run every 10 seconds
  async processPendingJobs() {
    const pendingJobs = await this.jobModel.find({ status: 'pending' }).exec();
    this.logger.log(`Found ${pendingJobs.length} pending jobs`);

    for (const job of pendingJobs) {
      try {
        await this.mailQueue.add(job.type, job.data);
        await this.jobModel.updateOne(
          { _id: job._id },
          { status: 'processing' },
        );
      } catch (error) {
        this.logger.error(
          `Failed to re-queue job ${job._id}: ${error.message}`,
        );
        await this.jobModel.updateOne({ _id: job._id }, { status: 'failed' });
      }
    }
  }
}
