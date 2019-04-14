import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import * as firebase from 'firebase';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userNames = new Array();
  public userNameTaken: boolean;
  public registerForm: FormGroup;
  public allUsers = new Array<any>();

  constructor(
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private flashMessages: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.auth.getUsernames()
      .subscribe((data) => {
        data.forEach((e) => {
          this.userNames.push(e)
        })
      })

    this.registerForm = this.formBuilder.group({
      userName: [''],
      email: [''],
      password1: [''],
      password2: ['']
    })

    firebase.database().ref('/userNames').once('value')
      .then(snapshot => {
        Object.keys(snapshot.val())
          .map((key, index) => {
            this.allUsers.push(snapshot.val()[key].userName)
          })
      })

  }

  get rForm() { return this.registerForm.controls };

  public registerUser(): void {

    if (this.registerForm.valid) {
      for (let i = 0; i < this.allUsers.length; i++) {
        if (this.rForm.userName.value == this.allUsers[i]) {
          console.log('username taken');
          this.flashMessages.show('Username Taken.', { cssClass: 'alert-danger', timeout: 2000 });
          break;
        } else if(this.rForm.password1.value === this.rForm.password2.value) {
          console.log('username not taken');
          this.auth.registerAccount(this.rForm.email.value, this.rForm.password1.value, this.rForm.userName.value.toLowerCase());
          this.router.navigate(['/'])
          break;
        }
      }
    } else {
      this.flashMessages.show('Please complete all fields', { cssClass: 'alert-danger', timeout: 2000 });
    }
  }
}

