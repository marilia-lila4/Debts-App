import { DebtsService } from './../../debts.service';
import { Debt } from './../debt';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debts-list',
  templateUrl: './debts-list.component.html',
  styleUrls: ['./debts-list.component.css'],
})
export class DebtsListComponent implements OnInit {
  debts: Debt[] = [];
  debtSelect: Debt;
  messageSuccess: string;
  messageError: string;

  constructor(private debtsService: DebtsService, private router: Router) {}

  ngOnInit(): void {
    this.getAllDebts();
  }

  getAllDebts(): void {
    this.debtsService
      .getDebts()
      .subscribe((response) => (this.debts = response));
  }

  newDebt(): void {
    this.router.navigate(['/debts/form']);
  }

  modalDeleteDebt(debt: Debt): void {
    this.debtSelect = debt;
  }

  deleteDebt(): void {
    this.debtsService.deleteDebt(this.debtSelect).subscribe(
      (response) => {
        (this.messageSuccess = 'Dívida Concluída com Sucesso'), this.ngOnInit();
      },
      (erro) => (this.messageError = 'Ocorreu um erro ao deletar a dívida')
    );
  }
}
