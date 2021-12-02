import { LayoutComponent } from './../layout/layout.component';
import { SavingsFormComponent } from './savings-form/savings-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavingsListComponent } from './savings-list/savings-list.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'savings',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: SavingsFormComponent },
      { path: 'form/:id', component: SavingsFormComponent },
      { path: 'list', component: SavingsListComponent },
      { path: '', redirectTo: '/savings/list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavingsRoutingModule {}
