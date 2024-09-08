import { SchemaConfig } from '@database/mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ toJSON: SchemaConfig.ToJSON, toObject: SchemaConfig.ToJSON })
export class AppInfo {
    @Prop({ unique: true, index: true })
    id: string;
    @Prop({ required: true })
    displayName: string;
    @Prop()
    config: string;
    @Prop()
    description: string;
}

export const AppInfoSchema = SchemaFactory.createForClass(AppInfo);
