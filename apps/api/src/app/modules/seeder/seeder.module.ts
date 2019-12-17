import { Module } from '@nestjs/common';
import { UserSeederService } from '../user/seeds/user.seed';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    UserSeederService,
  ],
})
export class SeederModule {
}
