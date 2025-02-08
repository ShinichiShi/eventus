// event.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  ticketPrice: number;

  @Prop({ required: true })
  organizer: string;

  @Prop({ required: true })
  contactEmail: string;

  @Prop()
  contactPhone: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.virtual('status').get(function () {
  return this.date > new Date() ? 'upcoming' : 'past';
});
