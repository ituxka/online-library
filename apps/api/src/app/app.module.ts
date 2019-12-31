import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { AuthorModule } from './modules/author/author.module';
import { BookModule } from './modules/book/book.module';
import { join } from 'path';
import { OrderModule } from './modules/order/order.module';
import { CronModule } from './modules/utility/cron/cron.module';
import { CheckoutModule } from './modules/checkout/checkout.module';
import { MailerModule } from './modules/utility/mailer/mailer.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', '/uploads'),
      renderPath: '/',
      serveStaticOptions: {
        index: false,
      },
    }),
    UserModule,
    AuthModule,
    SeederModule,
    AuthorModule,
    BookModule,
    OrderModule,
    CheckoutModule,
    CronModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
