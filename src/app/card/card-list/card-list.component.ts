import { CardService } from './../../card.service';
import { CardSearch } from './cardSearch';
import { Component, OnInit } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  name: string;
  month: number;
  months: number[];
  lists: CardSearch[];
  cardSelect: Card;
  cards: Card[] = [];
  message: string;
  messageSuccess: string;
  messageError: string;

  constructor(private cardService: CardService) {
    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  ngOnInit(): void {}

  search() {
    this.cardService.searchCard(this.name, this.month).subscribe((response) => {
      this.lists = response;
      if (this.lists.length <= 0) {
        this.message = 'Nenhum Registro Encontrado';
      } else {
        this.message = null;
      }
    });
  }

  modalDeleteCard(card: Card): void {
    this.cardSelect = card;
  }

  deleteCard(): void {
    this.cardService.deleteCard(this.cardSelect).subscribe(
      () => {
        (this.messageSuccess = 'Dívida Concluída com Sucesso'), this.search();
      },
      () => (this.messageError = 'Ocorreu um erro ao deletar a dívida')
    );
  }
}
