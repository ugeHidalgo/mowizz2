import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { PageNotFoundComponent } from '../components/main/not-found/not-found.component';

// Routing Modules
import { LoginRoutingModule } from '../login/login-routing.module';
import { SetupRoutingModule } from '../components/setup/setup-routing.module';
import { AccountsRoutingModule } from '../components/main/account/account-routing.module';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    LoginRoutingModule,
    SetupRoutingModule,
    AccountsRoutingModule,
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
