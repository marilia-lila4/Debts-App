import { SavingsService } from './../savings.service';
import { CardService } from './../card.service';
import { DebtsService } from './../debts.service';
import { Saving } from './../savings/savings';
import { Debt } from './../debts/debt';
import { Card } from './../card/card';
import { PhotosService } from './../photos.service';
import { Photo } from './photo';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailPhotoComponent } from './detail-photo/detail-photo.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  photos: Photo[] = [];
  debts: Debt[] = [];
  cards: Card[] = [];
  savings: Saving[] = [];
  public favourites: Array<Photo> = [];
  columns = ['id', 'name', 'photo'];
  formulario: FormGroup;
  message: string;
  photoSelect: Photo;
  messageSuccess: string;
  messageError: string;
  card: Card;
  debt: Debt;
  saving: Saving;

  constructor(
    private photosService: PhotosService,
    private debtsService: DebtsService,
    private cardService: CardService,
    private savingsService: SavingsService,
    private dialog: MatDialog,
    private snackBat: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listAll();
    this.buildForm();
  }

  buildForm() {
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submit(): void {
    const formValues = this.formulario.value;
    const photo: Photo = new Photo(formValues.name);
    this.photosService.savePhoto(photo).subscribe((response) => {
      this.listPhoto();
      this.snackBat.open('Objetivo foi adicionado!', 'X', {
        duration: 2000,
      });
      this.formulario.reset();
    });
  }

  listAll(): void {
    this.listPhoto();
    // this.listDebt();
    // this.listCard();
    // this.listSavings();
  }

  listPhoto() {
    this.photosService.getPhoto().subscribe((response) => {
      this.photos = response;
      if (response.length <= 0) {
        this.message = 'Nenhum Registro Encontrado';
      } else {
        this.message = null;
      }
    });
  }

  // listDebt() {
  //   this.debtsService.getDebts().subscribe((response) => {
  //     (this.debts = response), console.log('1', response);
  //   });
  // }

  // listCard() {
  //   this.cardService.getCards().subscribe((response) => {
  //     (this.cards = response), console.log('2', response);
  //   });
  // }

  // listSavings() {
  //   this.savingsService.getSaving().subscribe((response) => {
  //     (this.savings = response), console.log('3', response);
  //   });
  // }

  uploadPhoto(event, photo) {
    const files = event.target.files;
    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append('photo', foto);
      this.photosService.uploadPhoto(photo, formData).subscribe((response) => {
        this.listPhoto();
      });
    }
  }

  viewPhoto(photo: Photo) {
    this.dialog.open(DetailPhotoComponent, {
      width: '400px',
      height: '450px',
      data: photo,
    });
  }

  modalDeletePhoto(photo: Photo): void {
    this.photoSelect = photo;
  }

  deletePhoto(): void {
    this.photosService.deletePhoto(this.photoSelect).subscribe(
      (response) => {
        (this.messageSuccess = 'Foto excluída com sucesso'), this.ngOnInit();
      },
      (erro) => (this.messageError = 'Ocorreu um erro ao deletar a foto')
    );
  }
}
