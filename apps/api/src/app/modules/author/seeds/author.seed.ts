import { HttpException, OnApplicationBootstrap } from '@nestjs/common';
import { Injectable } from '@angular/core';
import { AuthorService } from '../author.service';

@Injectable()
export class AuthorSeederService implements OnApplicationBootstrap {
  constructor(
    private authorService: AuthorService,
  ) {
  }

  async onApplicationBootstrap() {
    try {
      await this.createStubAuthors();
    } catch (e) {
      if (e instanceof HttpException) {
        console.log(e.message);
        return;
      }

      console.log(e);
    }
  }

  async createStubAuthors() {
    return this.authorService.repository.save([
      { name: 'Vitaliy Zykov' },
      { name: 'Nikita Sologub' },
    ]);
  }
}
