import { Component } from '@angular/core';
import { LogService } from 'src/shared/services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample-angular-app-2023';
  screenName = 'AppComponent';
  screenId = '0';

  constructor(
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
