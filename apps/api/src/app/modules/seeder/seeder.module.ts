import { Module } from '@nestjs/common';
import { USER_SEEDER, UserSeederService } from '../user/seeds/user.seed';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: USER_SEEDER,
      useClass: UserSeederService,
    },
  ],
})
export class SeederModule {
}
