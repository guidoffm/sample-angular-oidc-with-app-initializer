import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  backendResponseCode = '';
  backendResponseBody = '';
  constructor(private authService: OAuthService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  callBackend() {
    this.http.get<string>('/api/test', { observe: 'response' }).subscribe(response => {
      console.log(response);
      this.backendResponseBody = JSON.stringify(response.body);
      this.backendResponseCode = response.status.toString();
    });
  }

  refreshTokens() {
    this.authService.refreshToken();
  }

  get hasValidToken() { return this.authService.hasValidAccessToken(); }
  get accessToken() { return this.authService.getAccessToken(); }
  get refreshToken() { return this.authService.getRefreshToken(); }
  get identityClaims() { return this.authService.getIdentityClaims(); }
  get idToken() { return this.authService.getIdToken(); }

}
