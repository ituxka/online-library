import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookCreateComponent } from './containers/book-create/book-create.component';
import { BookNavComponent } from './components/book-nav/book-nav.component';
import { MaterialModule } from '../material/material.module';
import { BookService } from './book.service';
import { AuthModule } from '../auth/auth.module';
import { BookLibraryComponent } from './containers/book-library/book-library.component';
import { BookListComponent } from './containers/book-library/book-list/book-list.component';
import { BookFilterComponent } from './containers/book-library/book-filter/book-filter.component';
import { FormsModule } from '@angular/forms';
import { BookDetailComponent } from './containers/book-detail/book-detail.component';
import { BookingService } from './booking.service';
import { WebsocketService } from './websocket.service';

@NgModule({
  declarations: [
    BookCreateComponent,
    BookNavComponent,
    BookLibraryComponent,
    BookFilterComponent,
    BookListComponent,
    BookFilterComponent,
    BookDetailComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MaterialModule,
    AuthModule,
    FormsModule,
  ],
  providers: [
    BookService,
    BookingService,
    WebsocketService,
  ],
  exports: [
    BookNavComponent,
  ],
})
export class BookModule { }
