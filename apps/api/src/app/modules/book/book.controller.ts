import { BookService } from './book.service';
import { Controller, UseGuards } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Book } from './book.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@online-library/api-interfaces';
import { handleCrudError } from './crud-error.handler';

@Crud({
  model: {
    type: Book,
  },
  routes: {
    createOneBase: {
      decorators: [UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.MODERATOR]))],
    },
    deleteOneBase: {
      decorators: [UseGuards(AuthGuard('jwt'), new RolesGuard([UserRole.MODERATOR]))],
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
      author: {
        eager: true,
      },
    },
  },
})
@Controller('book')
export class BookController implements CrudController<Book> {
  constructor(
    // must be named 'service' for @Crud decorator to work
    // see: https://github.com/nestjsx/crud/issues/19
    public service: BookService,
  ) {
  }

  get base(): CrudController<Book> {
    return this;
  }

  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Book,
  ): Promise<Book> {
    try {
      const book = await this.base.createOneBase(req, dto);
      return book;
    } catch (e) {
      handleCrudError(e);
    }
  }

  @Override()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Book,
  ): Promise<Book> {
    try {
      const book = await this.base.updateOneBase(req, dto);
      const updatedBook = await this.service.updateAvailability(book);
      return updatedBook;
    } catch (e) {
      handleCrudError(e);
    }
  }
}
