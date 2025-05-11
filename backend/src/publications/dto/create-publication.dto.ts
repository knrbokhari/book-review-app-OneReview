import { IsString, IsOptional, IsUrl, IsArray } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  cover_image?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  socials?: Record<string, any>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  translated_languages?: string[];
}
