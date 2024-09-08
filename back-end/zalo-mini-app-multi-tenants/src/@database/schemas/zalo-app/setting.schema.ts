import { SchemaConfig } from '@database/mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { v4 } from 'uuid';

@Schema({ toJSON: SchemaConfig.ToJSON, toObject: SchemaConfig.ToJSON })
export class Setting {
    @Prop({ unique: true, required: true, index: true, default: v4 })
    id: string;
    @Prop({ required: true, index: true })
    appId: string;
    @Prop({ type: MongooseSchema.Types.Mixed })
    setting: Object;
    @Prop({ required: true, index: true })
    version: number;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
