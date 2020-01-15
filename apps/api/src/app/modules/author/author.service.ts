import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Author } from './author.entity';
import { Inject, Injectable } from '@nestjs/common';
import { AUTHOR_REPOSITORY } from './author.constant';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService extends TypeOrmCrudService<Author> {
  constructor(
    @Inject(AUTHOR_REPOSITORY) private authorRepository: Repository<Author>,
  ) {
    super(authorRepository);
  }

  get repository() {
    return this.authorRepository;
  }
}
