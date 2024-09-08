import { SchemaConfig } from '@database/mongodb';
import { Audit } from '@database/schemas/audit.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';

@Schema({ timestamps: true, toJSON: SchemaConfig.ToJSON, toObject: SchemaConfig.ToJSON })
export class Follower extends Audit {
    @Prop({ unique: true, required: true, index: true, default: v4 })
    id: string;
    @Prop({ index: true, required: true })
    phone: String;
    @Prop({ index: true, required: true })
    appId: string;
}

export const FollowerSchema = SchemaFactory.createForClass(Follower);
