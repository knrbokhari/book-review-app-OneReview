import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  book_type?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  authors: number[];

  @IsOptional()
  @IsNumber()
  publicationId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsNumber()
  page?: number;

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

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @IsNumber({}, { each: true })
  categories: number[];

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  gallery?: string[];
}
