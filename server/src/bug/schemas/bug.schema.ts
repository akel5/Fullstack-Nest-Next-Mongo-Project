import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BugDocument = Bug & Document;

@Schema()
export class Bug {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: ['Critical', 'High', 'Medium', 'Low'], default: 'Medium' })
  severity: string;

  @Prop({ enum: ['Open', 'In Progress', 'Ready for QA', 'Closed'], default: 'Open' })
  status: string;

  @Prop()
  affectedVersion: string;

  @Prop()
  assignedTo: string; // שם המשתמש המוקצה

  @Prop()
  reportedBy: string; // שם המשתמש שדיווח

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const BugSchema = SchemaFactory.createForClass(Bug);