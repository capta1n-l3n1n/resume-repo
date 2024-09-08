import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';
import { Audit } from '../audit.schema';
import { SchemaConfig } from '@database/mongodb';

@Schema({ toJSON: SchemaConfig.ToJSON, toObject: SchemaConfig.ToJSON })
export class Store extends Audit {
    @Prop({ unique: true, required: true, index: true, default: v4 })
    id: string;
    @Prop({ required: true, index: true })
    name: string;
    @Prop({ required: true, index: true })
    address: string;
    @Prop({ required: true })
    lat: number;
    @Prop({ required: true })
    lng: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
