import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import * as firebase from 'firebase';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userNames = new Array();
  public errorMsg = 'ajnfjndjfnsdjnf';
  public userNameTaken: boolean;

  constructor(
    private auth: AuthenticationService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.auth.getUsernames()
      .subscribe((data) => {
        data.forEach((e) => {
          this.userNames.push(e)
        })
      })

  }

  public registerUser(username, email, p1, p2): void {

    if (p1 !== p2) {
      this.flashMessagesService.show('Passwords do not match',
        { cssClass: 'alert-danger', timeout: 3500 });
      window.location.reload();
    } else {
      this.userNames.forEach((e) => {
        if (username.toLowerCase() == e.userName.toLowerCase()) {
          this.userNameTaken = true;
          email = '';
          p1 = ''
        } else if (username.toLowerCase() != e.userName.toLowerCase()) {
          this.userNameTaken = false;
          this.auth.registerAccount(email, p1, username);
        }
      })
      if (this.userNameTaken == true) {
        this.flashMessagesService.show('Username in use',
          { cssClass: 'alert-danger', timeout: 3500 });
        window.location.reload();
      }
    }
  }
}

