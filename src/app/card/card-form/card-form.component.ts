import { CardSearch } from './../card-list/cardSearch';
import { CardService } from './../../card.service';
import { Card } from './../card';
import { DebtsService } from './../../debts.service';
import { Debt } from './../../debts/debt';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent implements OnInit {
  debts: Debt[] = [];
  debt: Debt;
  card: Card;
  lists: CardSearch;
  messageSuccess: boolean = false;
  messageErrors: String[];
  idCard: number;
  idDebtParams: number;

  constructor(
    private debtsService: DebtsService,
    private cardService: CardService,
    private activatedRoute: ActivatedRoute
  ) {
    this.card = new Card();
    this.debt = new Debt();
    this.lists = new CardSearch();
  }

  ngOnInit(): void {
    this.idDebtParams = this.activatedRoute.snapshot.params['idDebt'];
    this.cardById();
    this.showDebtSelectInput();
  }

  showDebtSelectInput(): void {
    if (!this.idCard) {
      this.debtsService
        .getDebts()
        .subscribe((response) => (this.debts = response));
    } else {
      this.cardService.getByIdCardSearch(this.idCard).subscribe((response) => {
        this.lists = response;
      });
    }
  }

  onSubmit(): void {
    if (this.idCard) {
      this.cardService.updateCards(this.card).subscribe(
        (response) => {
          this.messageSuccess = true;
          this.messageErrors = null;
        },
        (errorResponse) => {
          this.messageErrors = ['Erro ao atualizar a dívida'];
        }
      );
    } else {
      this.cardService.saveCard(this.card).subscribe(
        (response) => {
          this.messageSuccess = true;
          this.messageErrors = null;
          this.card = new Card();
        },
        (errorResponse) => {
          this.messageSuccess = false;
          this.messageErrors = errorResponse.error.errors;
        }
      );
    }
  }

  cardById(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.idCard = urlParams['id'];
      if (this.idCard) {
        this.cardService.getByIdCard(this.idCard).subscribe((response) => {
          (this.card = response), (errorResponse) => (this.card = new Card());
        });
      }
    });
  }
}
