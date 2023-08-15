import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Project } from 'src/projects/entities/project.entity';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type RewardDocument = HydratedDocument<Reward>;

@Schema()
export class Reward {
  @Prop({ default: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  value: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project_id: Project;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
