import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsUUID()
  parentId?: number;

  @IsOptional()
  @IsUUID()
  reviewId?: number;
}
