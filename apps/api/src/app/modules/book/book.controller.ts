import { BookService } from './book.service';
import { Controller, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { IBook, UserRole } from '@online-library/api-interfaces';
import { handleCrudError } from './crud-error.handler';
import { FileInterceptor } from '@nestjs/platform-express';
import { bookStorage } from './book.storage';

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
  @UseInterceptors(FileInterceptor('file', {
    storage: bookStorage,
  }))
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() body: { data: string },
    @UploadedFile() file,
  ) {
    const bookFromRequest = JSON.parse(body.data) as IBook;
    if (file != null) {
      bookFromRequest.coverImage = file.path;
    }
    bookFromRequest.isAvailableToOrder = this.service.isAvailableToOrder(bookFromRequest);

    try {
      const book = await this.base.createOneBase(req, bookFromRequest);
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
      return this.service.updateAvailability(book);
    } catch (e) {
      handleCrudError(e);
    }
  }
}
