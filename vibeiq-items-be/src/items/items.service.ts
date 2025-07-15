import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) {}

  /**
   * Create a new item
   * @param createItemDto - The data for creating a new item
   * @returns The created item
   */
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel({
      ...createItemDto,
      images: [],
    });
    return createdItem.save();
  }

  /**
   * Find all items with pagination support for large datasets
   * @param page - Page number (default: 1)
   * @param limit - Number of items per page (default: 10)
   * @returns Paginated list of items
   */
  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{
    items: Item[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.itemModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.itemModel.countDocuments(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Find a specific item by ID
   * @param id - The ID of the item to find
   * @returns The found item or throws NotFoundException
   */
  async findOne(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  /**
   * Add a new image to an item
   * @param id - The ID of the item
   * @param imageUrl - The URL of the uploaded image
   * @param imageId - The ID of the image
   * @returns The updated item
   */
  async addImage(id: string, imageUrl: string, imageId: string): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    // If this is the first image, mark it as primary
    const isPrimary = item.images.length === 0;

    item.images.push({
      url: imageUrl,
      isPrimary,
      imageId,
    });

    return item.save();
  }

  /**
   * Mark an image as the primary image for an item
   * @param id - The ID of the item
   * @param imageId - The ID of the image to mark as primary
   * @returns The updated item
   */
  async setPrimaryImage(id: string, imageId: string): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    const imageExists = item.images.some((img) => img.imageId === imageId);
    if (!imageExists) {
      throw new NotFoundException(
        `Image with ID ${imageId} not found for item ${id}`,
      );
    }

    // Update all images to not be primary, then set the selected one as primary
    item.images = item.images.map((img) => ({
      ...img,
      isPrimary: img.imageId === imageId,
    }));

    return item.save();
  }
}
