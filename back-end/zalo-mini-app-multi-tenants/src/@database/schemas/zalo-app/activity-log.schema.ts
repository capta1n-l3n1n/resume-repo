import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Activity } from '@app/enums';
import { Schema as MongooseSchema } from 'mongoose';
import { v4 } from 'uuid';
import { SchemaConfig } from '@database/mongodb';

@Schema({ toJSON: SchemaConfig.ToJSON, toObject: SchemaConfig.ToJSON })
export class ActivityLog {
    @Prop({ unique: true, required: true, index: true, default: v4 })
    id: string;
    @Prop({ required: true, index: true })
    phone: string;
    @Prop({ index: true })
    appId: string;
    @Prop()
    voucherCode: string;
    @Prop({ type: String, enum: Activity, required: true })
    activity: Activity;
    @Prop({ type: Number, default: () => Date.now() })
    logAt: number;
    @Prop({ type: Date, default: () => new Date() })
    logDate: Date;
    @Prop({ type: MongooseSchema.Types.Mixed })
    evidence: Object;
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);
