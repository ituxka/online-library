import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthQuery } from './state';
import { UserRole } from '@online-library/api-interfaces';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Directive({
  selector: '[olIfHasRoles]',
})
export class IfHasRoleDirective implements OnInit, OnDestroy {
  @Input('olIfHasRoles') roles: UserRole[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authQuery: AuthQuery,
  ) {
  }

  signOut(role: UserRole | null) {
    return !this.roles.includes(role) || role == null;
  }

  ngOnInit() {
    this.authQuery.role$.pipe(untilDestroyed(this))
      .subscribe((role) => {
        this.viewContainerRef.clear();

        if (this.signOut(role)) {
          return;
        }

        this.viewContainerRef.createEmbeddedView(this.templateRef);
      });
  }

  // must be present for untilDestroy operator
  ngOnDestroy() {
  }
}
