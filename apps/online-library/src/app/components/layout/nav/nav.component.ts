import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

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
  ) { }

  ngOnInit() {
  }

}
