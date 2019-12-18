import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserRole } from '@online-library/api-interfaces';

@Component({
  selector: 'ol-book-nav',
  templateUrl: './book-nav.component.html',
  styleUrls: ['./book-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookNavComponent implements OnInit {
  roles = UserRole;

  constructor() { }

  ngOnInit() {
  }

}
