import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavingsRoutingModule } from './savings-routing.module';
import { SavingsFormComponent } from './savings-form/savings-form.component';
import { FormsModule } from '@angular/forms';
import { SavingsListComponent } from './savings-list/savings-list.component';

@NgModule({
  declarations: [SavingsFormComponent, SavingsListComponent],
  imports: [CommonModule, SavingsRoutingModule, FormsModule],
  exports: [SavingsFormComponent, SavingsListComponent],
})
export class SavingsModule {}
