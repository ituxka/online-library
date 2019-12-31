import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { environment } from '../../../../environments/environment';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  private transporter: Mail;
  private defaultOptions: Mail.Options = {
    from: 'Online Library',
    to: '',
    subject: 'Book expires shortly',
    html: '<div>Hello fella, pls <b>RETURN the BOOK!</b></div>',
  };

  constructor() {
    this.initTransporter();
  }

  sendMail(options: Mail.Options = this.defaultOptions) {
    return this.transporter.sendMail(options);
  }

  private initTransporter() {
    this.transporter = createTransport({
      ...environment.email,
    });
  }
}
