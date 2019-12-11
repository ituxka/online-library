import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthQuery, AuthStoreService } from '../../../modules/auth/state';
import { Router } from '@angular/router';

@Component({
  selector: 'ol-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(res => res.matches),
      shareReplay(),
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authQuery: AuthQuery,
    private authStoreService: AuthStoreService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.authStoreService.logout();
    this.router.navigate(['/auth']).then();
  }

}
