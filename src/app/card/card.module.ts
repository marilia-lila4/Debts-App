import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardFormComponent } from './card-form/card-form.component';
import { CardListComponent } from './card-list/card-list.component';

@NgModule({
  declarations: [CardFormComponent, CardListComponent],
  imports: [CommonModule, CardRoutingModule, FormsModule, RouterModule],
  exports: [CardFormComponent, CardListComponent],
})
export class CardModule {}
