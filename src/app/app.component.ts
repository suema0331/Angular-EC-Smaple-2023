import { Component } from '@angular/core';
import { LogService } from 'src/shared/services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample-angular-app-2023';
  // 画面名
  screenName = 'AppComponent';
  // 画面ID
  screenId = '0';
  // authStateService: AuthStateService;
  constructor(
    // private appService: ApplicationService,
    private logService: LogService
  ) { }

  ngOnInit(): void {
    // this.appService.startup();
    this.logService.logDebug(`${this.screenId}:${this.screenName} が初期化されました。` );
  }

  ngOnDestroy(): void {
    this.logService.logDebug(`${this.screenId}:${this.screenName} が破棄されました。` );
  }
}
