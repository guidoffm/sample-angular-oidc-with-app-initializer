import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private oauthService: OAuthService) {
    if (this.oauthService.showDebugInformation) {
      this.oauthService.events.subscribe(console.log);
    }
    this.oauthService.loadDiscoveryDocumentAndLogin();
    this.oauthService.setupAutomaticSilentRefresh({}, 'access_token');
    // this.oauthService.events
    //   .pipe(filter(e => e.type === 'token_received'))
    //   .subscribe(_ => {
    //     // this.oauthService.loadUserProfile();
    //   });

    // this.oauthService.events
    //   .pipe(filter(e => e.type === 'user_profile_loaded'))
    //   .subscribe(_ => {
    //     console.log(this.oauthService);
    //   });
  }
  title = 'app';
}
