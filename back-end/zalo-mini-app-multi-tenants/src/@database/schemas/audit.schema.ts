import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Audit extends Document {
  @Prop()
  createdAt: Date;
  @Prop()
  createdBy: String;
  @Prop()
  updatedAt: Date;
  @Prop()
  updatedBy: String;
  @Prop()
  deletedAt: Date;
  @Prop()
  deletedBy: String;
}
