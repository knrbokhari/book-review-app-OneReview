/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MyLibraryService } from './my-library.service';
import { CreateMyLibraryDto } from './dto/create-my-library.dto';
import { UpdateMyLibraryDto } from './dto/update-my-library.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Controller('my-library')
export class MyLibraryController {
  constructor(private readonly service: MyLibraryService) {}

  @UseGuards(JwtGuard)
  @Post()
  addToLibrary(@CurrentUser() user: any, @Body() dto: CreateMyLibraryDto) {
    return this.service.addToLibrary({ ...dto, userId: user?.id });
  }

  @Patch(':userId/:bookId')
  updateStatus(
    @Param('userId') userId: number,
    @Param('bookId') bookId: number,
    @Body() dto: UpdateMyLibraryDto,
  ) {
    return this.service.updateStatus(+userId, +bookId, dto);
  }

  @Get()
  getAll(@Query('userId') userId: number) {
    return this.service.getAll(+userId);
  }

  @Delete(':userId/:bookId')
  remove(@Param('userId') userId: number, @Param('bookId') bookId: number) {
    return this.service.remove(+userId, +bookId);
  }
}
