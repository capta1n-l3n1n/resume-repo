import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { v4 } from 'uuid';
import { Audit } from '../audit.schema';
import { StringHelper } from '@app/shared/helpers';
import { TicketStatus, TicketType } from '@app/enums';
import { SchemaConfig } from '@database/mongodb';

@Schema({ timestamps: true, toJSON: SchemaConfig.ToJSON, toObject: SchemaConfig.ToJSON })
export class Ticket extends Audit {
    @Prop({ unique: true, required: true, index: true, default: v4 })
    id: string;
    @Prop({ required: true })
    phone: string;
    @Prop({ required: true })
    fromDate: Date;
    @Prop()
    toDate: Date;
    @Prop({ type: String, enum: TicketType, required: true })
    type: string;
    @Prop({ type: String, enum: TicketStatus, required: true })
    status: TicketStatus;
    @Prop({ type: String, default: StringHelper.EMPTY })
    content: string;
    @Prop({ type: MongooseSchema.Types.Mixed })
    extData: Object;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
