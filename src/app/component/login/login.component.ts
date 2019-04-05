import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public email: string;
  public password: string;
  public errorMsg: string;

  constructor(private authService: AuthenticationService, private router: Router, private flashMessagesService: FlashMessagesService) { }

  public signIn(): void {
    this.authService.login({ email: this.email, password: this.password })
      .then(resolve => this.router.navigate(['about']))
      .catch((error) => {
        this.flashMessagesService.show(error.message,
          { cssClass: 'alert-danger', timeout: 3500 });
      })


  }

}
