import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth-guard.service';
import { AutoLoginComponent } from './auto-login/auto-login.component';
import { FallbackComponent } from './fallback.component';
import { ProtectedComponent } from './protected/protected.component';

const routes: Routes = [
  { path: '', redirectTo: '/index.html', pathMatch: 'full' },
  {
    path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard], 
  },
  { path: 'index.html', component: AutoLoginComponent },
  { path: '**', component: FallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
