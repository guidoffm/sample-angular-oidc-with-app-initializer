import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { AuthorizerService } from '../shared/authorizer.service';

@Component({
  selector: 'app-auto-login',
  templateUrl: './auto-login.component.html',
  styleUrls: ['./auto-login.component.css']
})
export class AutoLoginComponent implements OnInit {

  displayLoginInProgess = true;
  displayAccessDenied = false;

  constructor(private router: Router, private oauthService: OAuthService, private authorizerService: AuthorizerService) { }

  ngOnInit(): void {
    if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()) {
      if (this.authorizerService.isAuthorized()) {
        this.processResult();
      } else {
        this.displayAccessDenied = true;
        this.displayLoginInProgess = false;
      }
    } else {
      this.oauthService.events
        .pipe(filter(e => e.type === 'token_received'))
        .subscribe(_ => this.processResult());
    }
  }

  processResult() {
    if (this.authorizerService.isAuthorized()) {
      this.router.navigateByUrl('/protected');
    } else {
      this.displayAccessDenied = true;
      this.displayLoginInProgess = false;
    }
  }
}
