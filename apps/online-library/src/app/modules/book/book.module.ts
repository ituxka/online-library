import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookCreateComponent } from './containers/book-create/book-create.component';
import { BookNavComponent } from './components/book-nav/book-nav.component';
import { MaterialModule } from '../material/material.module';
import { BookService } from './book.service';

@NgModule({
  declarations: [
    BookCreateComponent,
    BookNavComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MaterialModule,
  ],
  providers: [
    BookService,
  ],
  exports: [
    BookNavComponent,
  ],
})
export class BookModule { }
