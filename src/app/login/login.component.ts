import { User } from './user';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userName: string;
  password: string;
  signingUp: boolean;
  messageSuccess: string;
  errors: String[];

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    this.authService.tryLogin(this.userName, this.password).subscribe(
      (response) => {
        const access_token = JSON.stringify(response); // JSON.stringify - Transforma o metodo JSON em String
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['./home']);
      },
      (errorResponse) => {
        this.errors = ['Usuário e/ou senha incorreto(s).'];
      }
    );
  }

  prepareToRegister(event): void {
    event.preventDefault();
    this.signingUp = true;
  }

  cancelRegister(): void {
    this.signingUp = false;
  }

  save() {
    const user: User = new User();
    user.username = this.userName;
    user.password = this.password;
    this.authService.save(user).subscribe(
      (response) => {
        this.messageSuccess = 'Cadastro realizado com sucesso!';
        this.signingUp = false;
        this.userName = '';
        this.password = '';
        this.errors = [];
      },
      (errorResponse) => {
        this.messageSuccess = null;
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
