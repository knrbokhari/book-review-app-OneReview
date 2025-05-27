import { Module } from '@nestjs/common';
import { MyLibraryService } from './my-library.service';
import { MyLibraryController } from './my-library.controller';

@Module({
  controllers: [MyLibraryController],
  providers: [MyLibraryService],
})
export class MyLibraryModule {}
