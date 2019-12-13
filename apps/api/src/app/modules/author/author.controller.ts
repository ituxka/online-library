import { AuthorService } from './author.service';
import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Author } from './author.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@online-library/api-interfaces';
import { AuthorUniqueGuard } from './author-unique.guard';

@Crud({
  model: {
    type: Author,
  },
  routes: {
    createOneBase: {
      decorators: [
        UseGuards(
          AuthGuard('jwt'),
          new RolesGuard([UserRole.MODERATOR]),
          AuthorUniqueGuard,
        ),
      ],
    },
    deleteOneBase: {
      decorators:  [UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.MODERATOR]))],
    },
    replaceOneBase: {
      decorators: [UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.MODERATOR]))],
    },
    updateOneBase: {
      decorators: [UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.MODERATOR]))],
    },
  },
  query: {
    join: {
      books: {
        eager: true,
      },
    },
  },
})
@Controller('author')
export class AuthorController {
  constructor(
    // must be named 'service' for @Crud decorator to work
    // see: https://github.com/nestjsx/crud/issues/19
    private service: AuthorService,
  ) {
  }
}
