import { SchemaConfig } from '@database/mongodb';
import { Audit } from '@database/schemas/audit.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';

@Schema({ timestamps: true, toJSON: SchemaConfig.ToJSON, toObject: SchemaConfig.ToJSON })
export class Notification extends Audit {
    @Prop({ unique: true, index: true, default: v4 })
    id: String;
    @Prop({ index: true })
    appId: string;
    @Prop({ require: true })
    message: String;
    @Prop({ require: true, index: true })
    sender: String;
    @Prop({ require: true, index: true })
    receiver: String;
    @Prop({ default: false })
    isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
