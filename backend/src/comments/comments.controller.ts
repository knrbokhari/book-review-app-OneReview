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
  UseGuards,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
// import { Request } from 'express';
import { CommentService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateCommentDto, @Req() req: any) {
    const userId = req.user.id;
    return this.commentService.create(userId, dto);
  }

  @Get()
  findAll(@Query('reviewId') reviewId?: string) {
    return this.commentService.findAll(reviewId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.commentService.update(id, userId, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    return this.commentService.remove(id, userId);
  }
}
