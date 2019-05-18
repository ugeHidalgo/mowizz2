import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';
//import { PendingChangesGuard } from '../../guards/pending-changes.guard';

import { SetupComponent } from './setup.component';

const accountsRoutes: Routes = [
    //{ path: 'setup', component: SetupComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] }
    { path: 'setup', component: SetupComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(accountsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SetupRoutingModule { }