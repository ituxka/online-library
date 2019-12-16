import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import { Author } from '../author.entity';
import { Repository } from 'typeorm';
import { AUTHOR_REPOSITORY } from '../author.constant';

@Injectable()
export class AuthorUniqueGuard implements CanActivate {
  constructor(
    @Inject(AUTHOR_REPOSITORY)
    private authorRepository: Repository<Author>,
  ) {
  }

  async canActivate(context: ExecutionContext) {
    const author = context.switchToHttp().getRequest<{body: Author}>().body;
    const exists = await this.authorRepository.findOne({ name: author.name });

    if (exists) {
      throw new HttpException('Author already exits', 400);
    }

    return true;
  }
}
