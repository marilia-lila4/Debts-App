import { Saving } from './../savings';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SavingsService } from 'src/app/savings.service';

@Component({
  selector: 'app-savings-list',
  templateUrl: './savings-list.component.html',
  styleUrls: ['./savings-list.component.css'],
})
export class SavingsListComponent implements OnInit {
  savings: Saving[] = [];
  savingSelect: Saving;
  messageSuccess: string;
  messageError: string;

  constructor(private savingsService: SavingsService, private router: Router) {}

  ngOnInit(): void {
    this.getAllSavings();
  }

  getAllSavings(): void {
    this.savingsService
      .getSaving()
      .subscribe((response) => (this.savings = response));
  }

  newSaving(): void {
    this.router.navigate(['/savings/form']);
  }

  modalDeleteSaving(saving: Saving): void {
    this.savingSelect = saving;
  }

  deleteSaving(): void {
    this.savingsService.deleteSaving(this.savingSelect).subscribe(
      (response) => {
        (this.messageSuccess = 'Dívida Concluída com Sucesso'), this.ngOnInit();
      },
      (erro) => (this.messageError = 'Ocorreu um erro ao deletar a dívida')
    );
  }
}
