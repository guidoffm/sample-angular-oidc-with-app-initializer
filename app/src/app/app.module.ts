import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { FallbackComponent } from './fallback.component';
import { AutoLoginComponent } from './auto-login/auto-login.component';
import { AuthGuard } from './shared/auth-guard.service';
import { ConfigService } from './shared/config.service';

registerLocaleData(localeDe);
export function getAuthConfig(http: HttpClient, oAuthService: OAuthService, configService: ConfigService): (() => Promise<void>) {
  return (): Promise<void> => {
    return new Promise<void>((resolve) => {
      http.get('/assets/config.json').subscribe((data: any) => {

        const cfg = {
          issuer: data.authConfig.issuer,
          clientId: data.authConfig.clientId,
          responseType: data.authConfig.responseType,
          redirectUri: window.location.origin + data.authConfig.redirectUri,
          silentRefreshRedirectUri: window.location.origin + data.authConfig.silentRefreshRedirectUri,
          scope: data.authConfig.scope, // Ask offline_access to support refresh token refreshes
          useSilentRefresh: data.authConfig.useSilentRefresh, // Needed for Code Flow to suggest using iframe-based refreshes
          silentRefreshTimeout: data.authConfig.silentRefreshTimeout,
          timeoutFactor: data.authConfig.timeoutFactor,
          sessionChecksEnabled: data.authConfig.sessionChecksEnabled,
          showDebugInformation: data.authConfig.showDebugInformation, // Also requires enabling "Verbose" level in devtools
          clearHashAfterLogin: data.authConfig.clearHashAfterLogin, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
          nonceStateSeparator: data.authConfig.nonceStateSeparator // Real semicolon gets mangled by IdentityServer's URI encoding
        } as AuthConfig;

        oAuthService.configure(cfg);
        configService.requiredGroup = data.requiredGroup;
        resolve();
      });
    });
  };
}

// We need a factory since localStorage is not available at AOT build time
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent,
    FallbackComponent,
    AutoLoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    OAuthService,
    { provide: LOCALE_ID, useValue: 'de-DE' },
    {
      provide: OAuthModuleConfig, useValue: {
        resourceServer: {
          allowedUrls: ['/api'],
          sendAccessToken: true,
        }
      }
    },
    { provide: OAuthStorage, useFactory: storageFactory },
    { provide: APP_INITIALIZER, useFactory: getAuthConfig, deps: [HttpClient, OAuthService, ConfigService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
