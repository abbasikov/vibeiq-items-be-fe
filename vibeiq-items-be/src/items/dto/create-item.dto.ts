import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
