/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Req,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() dto: CreateReviewDto, @CurrentUser() user: any) {
    const userId = user.id;

    return this.reviewService.create(userId, dto);
  }

  @Get()
  findAll(
    @CurrentUser() user: any,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.reviewService.findAll(user?.id, page, limit);
  }

  @Get('/user')
  findAllUser(
    @Query('bookId') bookId?: number,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.reviewService.findAll(Number(bookId), page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne(id);
  }

  // @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateReviewDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.reviewService.update(id, userId, dto);
  }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: any) {
    const userId = req.user.id;
    return this.reviewService.remove(id, userId);
  }
}
