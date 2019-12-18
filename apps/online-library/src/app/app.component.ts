import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthStoreService } from './modules/auth/state';

@Component({
  selector: 'ol-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private authStoreService: AuthStoreService,
  ) {
  }

  ngOnInit() {
    this.authStoreService.validateToken()
      .catch(() => {
        this.authStoreService.logout();
      });
  }
}
