/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Put,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateCommentDto, @Req() req: any) {
    const userId = req.user.id;
    return this.commentService.create(userId, dto);
  }

  @Get()
  findAll(@Query('reviewId') reviewId?: number) {
    return this.commentService.findAll(reviewId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(+id);
  }

  // @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateCommentDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.commentService.update(id, userId, dto);
  }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: any) {
    const userId = req.user.id;
    return this.commentService.remove(id, userId);
  }
}
