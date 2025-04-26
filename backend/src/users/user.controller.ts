/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Body, Patch, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { PaginationDto } from './dto/pagination.dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@CurrentUser() user: any) {
    return this.userService.getMe(user.sub);
  }

  @Patch('update')
  updateUser(@CurrentUser() user: any, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(user.sub, dto);
  }

  @Get()
  listUsers(@Query() paginationDto: PaginationDto) {
    return this.userService.listUsers(paginationDto);
  }

  @Patch('deactivate')
  deactivateAccount(@CurrentUser() user: any) {
    return this.userService.deactivateAccount(user.id);
  }
}
