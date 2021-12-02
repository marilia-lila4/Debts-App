import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebtsRoutingModule } from './debts-routing.module';
import { DebtsFormComponent } from './debts-form/debts-form.component';
import { FormsModule } from '@angular/forms';
import { DebtsListComponent } from './debts-list/debts-list.component';

@NgModule({
  declarations: [DebtsFormComponent, DebtsListComponent],
  imports: [CommonModule, DebtsRoutingModule, FormsModule],
  exports: [DebtsFormComponent, DebtsListComponent],
})
export class DebtsModule {}
