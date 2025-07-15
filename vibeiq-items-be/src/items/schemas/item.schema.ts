import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_doc, ret: Record<string, any>) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      // Add primaryImage
      // if (Array.isArray(ret.images)) {
      //   const primary = ret.images.find((img: any) => img.isPrimary);
      //   ret.primaryImage = 'http://localhost:3000' + primary?.url;
      // }
      return ret;
    },
  },
})

export class Item {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop([
    {
      url: { type: String, required: true },
      isPrimary: { type: Boolean, default: false },
      imageId: { type: String, required: true },
    },
  ])
  images: Array<{
    url: string;
    isPrimary: boolean;
    imageId: string;
  }>;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

// Create compound index for better performance with large datasets
ItemSchema.index({ name: 'text', description: 'text' });
