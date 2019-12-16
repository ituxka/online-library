import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookCreateComponent } from './containers/book-create/book-create.component';
import { BookNavComponent } from './components/book-nav/book-nav.component';
import { MaterialModule } from '../material/material.module';
import { BookService } from './book.service';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    BookCreateComponent,
    BookNavComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MaterialModule,
    AuthModule,
  ],
  providers: [
    BookService,
  ],
  exports: [
    BookNavComponent,
  ],
})
export class BookModule { }
