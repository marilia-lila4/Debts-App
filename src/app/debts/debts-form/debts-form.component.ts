import { Observable } from 'rxjs';
import { DebtsService } from './../../debts.service';
import { Debt } from './../debt';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-debts-form',
  templateUrl: './debts-form.component.html',
  styleUrls: ['./debts-form.component.css'],
})
export class DebtsFormComponent implements OnInit {
  debt: Debt;
  messageSuccess: boolean = false;
  messageErrors: String[];
  idDebt: number;

  constructor(
    private debtService: DebtsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.debt = new Debt(); // Sem instanciar o objeto ele não reconhece que os campos estão preenchidos e retona o erro 'Cannot read properties of undefined (reading 'id')'
  }

  ngOnInit(): void {
    this.debtById();
  }

  onSubmit(): void {
    if (this.idDebt) {
      this.debtService.updateDebt(this.debt).subscribe(
        (response) => {
          this.messageSuccess = true;
          this.messageErrors = null;
        },
        (errorResponse) => {
          this.messageErrors = ['Erro ao atualizar a dívida'];
        }
      );
    } else {
      this.debtService.saveDebt(this.debt).subscribe(
        (response) => {
          this.debt = response;
          this.messageSuccess = true;
          this.messageErrors = null;
        },
        (errorResponse) => {
          this.messageSuccess = false;
          this.messageErrors = errorResponse.error.errors;
        }
      );
    }
  }

  debtById(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.idDebt = urlParams['id'];
      if (this.idDebt) {
        this.debtService.getByIdDebt(this.idDebt).subscribe((response) => {
          (this.debt = response), (errorResponse) => (this.debt = new Debt());
        });
      }
    });
  }

  // Outra possibilidade de pegar o id
  // debtById(): void {
  //   const params = +this.activatedRoute.snapshot.paramMap.get('id');
  //   this.debtService.getByIdDebt(params).subscribe((response) => {
  //     (this.debt = response), (errorResponse) => (this.debt = new Debt());
  //   });
  // }

  newDebt(): void {
    this.router.navigate(['/debts/list']);
  }
}
