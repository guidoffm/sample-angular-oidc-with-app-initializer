import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizerService {

  constructor(private authService: OAuthService, private configService: ConfigService) { }

  isAuthorized() {

    if (!this.authService.hasValidIdToken()) {
      return false;
    }
    
    if (!this.authService.hasValidAccessToken()) {
      return false;
    }

    // If the attribute "requiredGroup" is not set, no other checks needed
    if (!this.configService.requiredGroup) {
      return true;
    }

    // Implement your own logic here to check a claim that contains group membership information
    const groupsString: string = (this.authService.getIdentityClaims() as any).groups;

    if (!groupsString) {
      return false;
    }

    const groups = groupsString.split('|').filter(x => x);
    console.log(groups);

    return groups.filter(x => x === this.configService.requiredGroup).length > 0;
  }
}
