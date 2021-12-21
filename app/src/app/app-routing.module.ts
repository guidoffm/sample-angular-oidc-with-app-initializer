import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth-guard.service';
import { AutoLoginComponent } from './auto-login/auto-login.component';
import { FallbackComponent } from './fallback.component';
import { ProtectedComponent } from './protected/protected.component';

const routes = [
  {
    path: '',
    redirectTo: '/index.html',
    pathMatch: 'full'
  } as Route,
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
  } as Route,
  {
    path: 'index.html',
    component: AutoLoginComponent
  } as Route,
  {
    path: '**',
    component: FallbackComponent
  } as Route,
] as Routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
