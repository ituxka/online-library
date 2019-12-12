import { Module } from '@nestjs/common';
import { authorProviders } from './author.providers';
import { DatabaseModule } from '../../database/database.module';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorUniqueGuard } from './author-unique.guard';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    ...authorProviders,
    AuthorService,
    AuthorUniqueGuard,
  ],
  controllers: [AuthorController],
})
export class AuthorModule {
}
