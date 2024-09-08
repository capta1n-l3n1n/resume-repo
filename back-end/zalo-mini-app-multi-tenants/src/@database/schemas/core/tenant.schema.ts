import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 } from 'uuid';

@Schema()
export class Tenant extends Document {
    @Prop({ unique: true, required: true, index: true, default: v4 })
    id: string;
    @Prop({ required: true, unique: true })
    tenantId: string;
    @Prop({ required: true })
    tenantName: string;
    @Prop({ required: true })
    dbName: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
