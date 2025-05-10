import { IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsOptional()
  // @IsUrl()
  @IsString()
  image?: string;

  @IsOptional()
  // @IsUrl()
  @IsString()
  cover_image?: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  quote?: string;

  @IsOptional()
  @IsString()
  born?: string;

  @IsOptional()
  @IsString()
  death?: string;
}
