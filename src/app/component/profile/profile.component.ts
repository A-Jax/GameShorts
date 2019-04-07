import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUser = firebase.auth().currentUser;
  public displayPicture = this.currentUser.photoURL;
  public displayName: string;
  public emailForm: FormGroup;
  public passwordForm: FormGroup;
  public pictureForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private flashMessages: FlashMessagesService) { }

  ngOnInit() {

    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }

    this.emailForm = this.formBuilder.group({
      emailAddress: ['', Validators.required]
    })

    this.passwordForm = this.formBuilder.group({
      passwordOne: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      passwordTwo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]]
    })

    this.pictureForm = this.formBuilder.group({
      profilePicture: ['', Validators.required]
    })

    this.displayName = this.currentUser.displayName;

  }

  get eF() { return this.emailForm.controls };
  get pF() { return this.passwordForm.controls };

  public updateEmail(): void {
    if (!this.emailForm.valid) {
      this.flashMessages.show('Please complete all fields.', { cssClass: 'alert-danger', timeout: 2000 });
    } else {
      this.currentUser.updateEmail(this.eF.emailAddress.value)
        .then(() => {
          this.flashMessages.show('Email Updated.', { cssClass: 'alert-success', timeout: 2000 });
        })
        .catch((error) => {
          this.flashMessages.show('Please log in for your security.', { cssClass: 'alert-danger', timeout: 2000 });
        });
    }
  }

  public updatePassword(): void {

    if (this.pF.passwordOne.value !== this.pF.passwordTwo.value) {
      this.flashMessages.show('Passwords do not match!', { cssClass: 'alert-danger', timeout: 2000 });
    } else if (!this.passwordForm.valid) {
      this.flashMessages.show('Please complete all fields', { cssClass: 'alert-danger', timeout: 2000 });
    }
    else {
      this.currentUser.updatePassword(this.pF.passwordOne.value)
        .then(() => {
          this.flashMessages.show('Password Updated.', { cssClass: 'alert-success', timeout: 2000 });
        })
        .catch((error) => {
          this.flashMessages.show('Please log in for your security.', { cssClass: 'alert-danger', timeout: 2000 });
        });
    }

  }

  changePicture(): void {

    if (this.pictureForm.valid) {
      this.currentUser.updateProfile({
        displayName: this.currentUser.displayName,
        photoURL: this.pictureForm.controls.profilePicture.value
      }).then(function () {
        window.location.reload()
      })
        .catch((error) => {
          this.flashMessages.show('An error occured, please try again later...', { cssClass: 'alert-danger', timeout: 2000 });
        });
    } else {
      this.flashMessages.show('Please complete all fields', { cssClass: 'alert-danger', timeout: 2000 });
    }

  }

}

