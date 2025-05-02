import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsUrl()
  cover_image?: string;

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
