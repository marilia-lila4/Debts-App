import { Observable } from 'rxjs';
import { SavingsService } from './../../savings.service';
import { Saving } from './../savings';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-savings-form',
  templateUrl: './savings-form.component.html',
  styleUrls: ['./savings-form.component.css'],
})
export class SavingsFormComponent implements OnInit {
  saving: Saving;
  messageSuccess: boolean = false;
  messageErrors: String[];
  idSaving: number;

  constructor(
    private savingService: SavingsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.saving = new Saving(); // Sem instanciar o objeto ele não reconhece que os campos estão preenchidos e retona o erro 'Cannot read properties of undefined (reading 'id')'
  }

  ngOnInit(): void {
    this.savingById();
  }

  onSubmit(): void {
    if (this.idSaving) {
      this.savingService.updateSaving(this.saving).subscribe(
        (response) => {
          this.messageSuccess = true;
          this.messageErrors = null;
        },
        (errorResponse) => {
          this.messageErrors = ['Erro ao atualizar o valor'];
        }
      );
    } else {
      this.savingService.saveSaving(this.saving).subscribe(
        (response) => {
          this.saving = response;
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

  savingById(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe((urlParams) => {
      this.idSaving = urlParams['id'];
      if (this.idSaving) {
        this.savingService
          .getByIdSaving(this.idSaving)
          .subscribe((response) => {
            (this.saving = response),
              (errorResponse) => (this.saving = new Saving());
          });
      }
    });
  }

  // Outra possibilidade de pegar o id
  // savingById(): void {
  //   const params = +this.activatedRoute.snapshot.paramMap.get('id');
  //   this.savingService.getByIdSaving(params).subscribe((response) => {
  //     (this.saving = response), (errorResponse) => (this.saving = new Saving());
  //   });
  // }

  newSaving(): void {
    this.router.navigate(['/savings/list']);
  }
}
