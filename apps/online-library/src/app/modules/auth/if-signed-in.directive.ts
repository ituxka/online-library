import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthQuery } from './state';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Directive({
  selector: '[olIfSignedIn]',
})
export class IfSignedInDirective implements OnInit, OnDestroy {
  @Input('olIfSignedIn') showIfSignedIn: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authQuery: AuthQuery,
  ) {
  }

  ngOnInit() {
    this.authQuery.isSignedIn$
      .pipe(untilDestroyed(this))
      .subscribe((isSignedIn) => {
        this.viewContainerRef.clear();
        switch (true) {
          case isSignedIn && this.showIfSignedIn:
            this.viewContainerRef.createEmbeddedView(this.templateRef); break;
          case isSignedIn && !this.showIfSignedIn:
            this.viewContainerRef.clear(); break;
          case !isSignedIn && this.showIfSignedIn:
            this.viewContainerRef.clear(); break;
          case !isSignedIn && !this.showIfSignedIn:
            this.viewContainerRef.createEmbeddedView(this.templateRef); break;
        }
      });
  }

  // must be present for untilDestroy operator
  ngOnDestroy() {
  }
}
