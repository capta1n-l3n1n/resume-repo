import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Job extends Document {
  @Prop()
  jobId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type: Object })
  data: Record<string, any>;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
