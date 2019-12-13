import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    SeederModule,
    AuthorModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
