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


  constructor(private auth: AuthenticationService, private flashMessagesService: FlashMessagesService) { }
  userNames = new Array();
  errormsg = 'ajnfjndjfnsdjnf'
  ngOnInit() {
    this.auth.getUsernames()
      .subscribe((data) => {
        data.forEach((e) => {
          this.userNames.push(e)
        })
      })

  }

  userNameTaken;
  registerUser(username, email, p1, p2) {

    if (p1 !== p2) {
      console.log('error, passwords do not match')
    } else {
      this.userNames.forEach((e) => {
        if (username.toLowerCase() == e.userName.toLowerCase()) {
          this.userNameTaken = true;
        } else {
          this.userNameTaken = false;
        }
      })
      console.log(this.userNameTaken)
      if (this.userNameTaken == true) {
        this.flashMessagesService.show('Username in use',
          { cssClass: 'alert-danger', timeout: 3500 });
        email = '';
        p1 = ''
      }
      else if (this.userNameTaken == false) {
        this.auth.registerAccount(email, p1, username);
        this.flashMessagesService.show('Account registered',
          { cssClass: 'alert-success', timeout: 3500 });
      }

    }

  }
}

