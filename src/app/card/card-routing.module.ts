import { LayoutComponent } from './../layout/layout.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardFormComponent } from './card-form/card-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'cards',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: CardFormComponent },
      { path: 'form/:id', component: CardFormComponent },
      { path: 'list', component: CardListComponent },
      { path: '', redirectTo: '/cards/list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardRoutingModule {}
