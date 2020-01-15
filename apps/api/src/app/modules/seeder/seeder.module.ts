import { Module } from '@nestjs/common';
import { UserSeederService } from '../user/seeds/user.seed';
import { UserModule } from '../user/user.module';
import { AuthorSeederService } from '../author/seeds/author.seed';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [
    UserModule,
    AuthorModule,
  ],
  providers: [
    UserSeederService,
    AuthorSeederService,
  ],
})
export class SeederModule {
}
