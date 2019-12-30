import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookCreateComponent } from './containers/book-create/book-create.component';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@online-library/api-interfaces';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BookLibraryComponent } from './containers/book-library/book-library.component';
import { BookDetailComponent } from './containers/book-detail/book-detail.component';
import {
  BookDetailModeratorComponent,
} from './containers/book-detail/moderator/book-detail-moderator.component';

const routes: Routes = [
  {
    path: 'create',
    component: BookCreateComponent,
    canActivate: [AuthGuard, RolesGuard],
    data: {
      roles: [UserRole.MODERATOR],
    },
  },
  {
    path: 'library',
    component: BookLibraryComponent,
  },
  {
    path: ':id',
    component: BookDetailComponent,
    children: [
      {
        path: 'moderator',
        component: BookDetailModeratorComponent,
        canActivate: [AuthGuard, RolesGuard],
        data: {
          roles: [UserRole.MODERATOR],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule { }
