/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
  Put,
} from '@nestjs/common';
import { MyLibraryService } from './my-library.service';
import { CreateMyLibraryDto } from './dto/create-my-library.dto';
import { UpdateMyLibraryDto } from './dto/update-my-library.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@UseGuards(JwtGuard)
@Controller('my-library')
export class MyLibraryController {
  constructor(private readonly service: MyLibraryService) {}

  @Post()
  addToLibrary(@CurrentUser() user: any, @Body() dto: CreateMyLibraryDto) {
    return this.service.addToLibrary({ ...dto, userId: user?.id });
  }

  @Put(':userId/:bookId')
  updateStatus(
    @Param('userId') userId: number,
    @Param('bookId') bookId: number,
    @Body() dto: UpdateMyLibraryDto,
  ) {
    return this.service.updateStatus(+userId, +bookId, dto);
  }
  // @Query('userId') userId: number

  @Get()
  getAll(
    @CurrentUser() user: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(user);
    return this.service.getAll(+user?.id, page, limit);
  }

  @Delete(':userId/:bookId')
  remove(@Param('userId') userId: number, @Param('bookId') bookId: number) {
    return this.service.remove(+userId, +bookId);
  }
}
