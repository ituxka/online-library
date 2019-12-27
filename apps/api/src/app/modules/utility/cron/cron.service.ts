import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';

@Injectable()
export class CronService {

  schedule(date: Date, runFn: () => void) {
    const job = new CronJob(date, runFn);
    job.start();
  }
}
