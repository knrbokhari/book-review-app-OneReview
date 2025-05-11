import {
  IsArray,
  IsDateString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  book_type?: string;

  // @IsArray()
  @IsOptional()
  @IsObject()
  authors: any;

  @IsOptional()
  publisher: any;

  @IsOptional()
  @IsString()
  publicationId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsDateString()
  publicationDate?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  currentEdition?: string;

  @IsString()
  // @Min(0)
  price: string;

  @IsArray()
  // @IsNumber({}, { each: true })
  categories: any;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @IsString()
  gallery?: string[];
}
