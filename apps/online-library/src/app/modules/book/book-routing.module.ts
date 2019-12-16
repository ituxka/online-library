import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookCreateComponent } from './containers/book-create/book-create.component';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@online-library/api-interfaces';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'create',
    component: BookCreateComponent,
    canActivate: [AuthGuard, RolesGuard],
    data: {
      roles: [UserRole.MODERATOR],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule { }