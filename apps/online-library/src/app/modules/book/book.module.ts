import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './containers/book/book.component';
import { BookNavComponent } from './components/book-nav/book-nav.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [BookComponent, BookNavComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    MaterialModule,
  ],
  exports: [
    BookNavComponent,
  ],
})
export class BookModule { }
