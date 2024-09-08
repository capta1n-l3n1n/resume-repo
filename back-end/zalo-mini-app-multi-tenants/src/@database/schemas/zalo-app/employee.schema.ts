import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 } from 'uuid';
import { Audit } from '../audit.schema';
import { SchemaConfig } from '@database/mongodb';

@Schema({ toJSON: SchemaConfig.ToJSON, toObject: SchemaConfig.ToJSON })
export class Employee extends Audit {
    @Prop({ unique: true, required: true, index: true, default: v4 })
    id: string;
    @Prop({ required: true, index: true })
    name: string;
    @Prop({ required: true, index: true, unique: true })
    phone: string;
    @Prop({ default: null })
    deviceId: string;
    @Prop({ required: true })
    storeId: string;
    @Prop({ required: true })
    position: string;
    @Prop({ required: true })
    positionLevel: number;
    @Prop({ required: false, default: null })
    managerId: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.index({ name: 'text' });
