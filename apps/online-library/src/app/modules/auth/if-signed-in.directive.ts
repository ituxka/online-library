import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthQuery } from './state';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[olIfSignedIn]',
})
export class IfSignedInDirective implements OnInit, OnDestroy {
  @Input('olIfSignedIn') showIfSignedIn: boolean;

  subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authQuery: AuthQuery,
  ) {
  }

  ngOnInit() {
    this.subscription = this.authQuery.isSignedIn$
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
