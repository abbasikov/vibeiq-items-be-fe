import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  Put,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './schemas/item.schema';
import { v4 as uuidv4 } from 'uuid';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  /**
   * Create a new item
   * @param createItemDto - The data for creating a new item
   * @returns The created item
   */
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  /**
   * Get all items with pagination
   * @param page - Page number (default: 1)
   * @param limit - Number of items per page (default: 10)
   * @returns Paginated list of items
   */
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.itemsService.findAll(page, limit);
  }

  /**
   * Get a specific item by ID
   * @param id - The ID of the item
   * @returns The found item
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  /**
   * Upload a new image for an item
   * @param id - The ID of the item
   * @param file - The uploaded image file
   * @returns The updated item with the new image
   */
  @Post(':id/images')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Item> {
    const imageId = uuidv4();
    const imageUrl = `/uploads/${file.filename}`;
    return this.itemsService.addImage(id, imageUrl, imageId);
  }

  /**
   * Mark an image as the primary image for an item
   * @param id - The ID of the item
   * @param imageId - The ID of the image to mark as primary
   * @returns The updated item
   */
  @Put(':id/images/:imageId/primary')
  async setPrimaryImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
  ): Promise<Item> {
    return this.itemsService.setPrimaryImage(id, imageId);
  }
}
