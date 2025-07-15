import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item, ItemSchema } from './schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = uuidv4();
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    }),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
