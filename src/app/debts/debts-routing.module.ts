import { LayoutComponent } from './../layout/layout.component';
import { DebtsFormComponent } from './debts-form/debts-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'debts',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: DebtsFormComponent },
      { path: 'form/:id', component: DebtsFormComponent },
      { path: 'list', component: DebtsListComponent },
      { path: '', redirectTo: '/debts/list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebtsRoutingModule {}
