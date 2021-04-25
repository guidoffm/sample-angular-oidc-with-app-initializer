# sample-angular-oidc-with-app-initializer

This is a sample project that uses Manfred Steyer's great library [angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc) to add OpenID Connect to an Angular project.

It uses the Angular [APP_INITIALIZER](https://angular.io/api/core/APP_INITIALIZER) to configure the authentication at runtime.

## Documentation

### Authentication Configuration

The [authConfig](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/classes/AuthConfig.html) is read at runtime from the file [app/src/assets/config.json](app/src/assets/config.json) that is loaded at startup. To allow easier configuration the values
for `redirectUri` and `silentRefreshRedirectUri` use relative urls that are prefixed 
with the url got from `window.location.origin`.

### Authorization

Maybe you want to do some authorization based on claims received by the OIDC token issuer.

For this, a simple [authorizer](app/src/app/shared/authorizer.service.ts) has been implemented. It is up to you to implement your own logic there to check the authorization.

### Start

To start the app just run:

```bash
(cd app && npm start)
```

The start configuration uses [proxy-local-conf.json](proxy-local-conf.json) to map 
any request starting with `"/api"` to a backend running on `http://localhost:3000`. This is just for testing. Adjust the settings to map your own backend app there.

You can find an example backend here:
[https://github.com/guidoffm/sample-backend-for-angular-oidc-with-app-initializer](https://github.com/guidoffm/sample-backend-for-angular-oidc-with-app-initializer)
