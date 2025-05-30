import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { CategoriesModule } from './categories/categories.module';
import { PublicationsModule } from './publications/publications.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { CommentsModule } from './comments/comments.module';
import { ReviewModule } from './review/review.module';
import { MyLibraryModule } from './my-library/my-library.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    CategoriesModule,
    PublicationsModule,
    AuthorsModule,
    BooksModule,
    CommentsModule,
    ReviewModule,
    MyLibraryModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
