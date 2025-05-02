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
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
