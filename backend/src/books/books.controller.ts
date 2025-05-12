import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.bookService.findAll(page, limit);
  }

  @Get('popular')
  popular(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.bookService.popular(page, limit);
  }

  @Get('/new')
  newBook(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.bookService.newBook(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
    return this.bookService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.remove(id);
  }
}

// [
//   "a-new-earth.jpg",
//   "switch.jpg",
//   "outliers.jpg",
//   "get-out-of-your-head.jpg",
//   "think-like-a-monk.jpg",
//   "boundaries.jpg",
//   "the-confidence-code.jpg",
//   "your-best-year-ever.jpg",
//   "principles.png",
//   "make-your-bed.png",
//   "unlimited-power.jpeg",
//   "mans-search-for-meaning.jpg",
//   "tools-of-titans.webp",
//   "the-war-of-art.jpg",
//   "success-principles.jpg",
//   "magic-of-thinking-big.jpg",
//   "5-second-rule.jpg",
//   "start-with-why.png",
//   "untethered-soul.webp",
//   "essentialism.jpeg",
//   "life-changing-magic.jpeg",
//   "you-are-a-badass.jpeg",
//   "the-midnight-library.jpeg",
//   "daring-greatly.jpg",
//   "the-7-habits-of-highly-effective-people.png",
//   "awaken-the-giant-within.jpg",
//   "the-four-agreements.jpg",
//   "atomic-habits.jpg",
//   "the-midnight-library.png",
//   "mindset.png",
//   "how-to-win-friends-and-influence-people.jpg",
//   "the-subtle-art-of-not.jpg",
//   "the-power-of-habit.jpg",
//   "grit.png",
//   "drive.png",
//   "the-power-of-now.jpg",
//   "cant-hurt-me.jpg",
//   "think-and-grow-rich.jpg",
//   "deep-work.jpg",
//   "the-miracle-morning.jpg"
// ]
