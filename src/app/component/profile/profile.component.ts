import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Observable } from 'rxjs/Observable';
import { GalleryImage } from '../../models/galleryImage.model'
import * as firebase from 'firebase'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {

    this.emailForm = this.formBuilder.group({
      emailAddress: ['', Validators.required]
    })

    this.passwordForm = this.formBuilder.group({
      passwordOne: ['', Validators.required, Validators.minLength(6), Validators.maxLength(200)]
    })

    this.displayName = this.currentUser.displayName;
    // console.log(this.currentUser);
    // this.currentUser.updateProfile({
    //   displayName: "Lewis",
    //   photoURL: "https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/43398187_10155746526252551_806481561246498816_o.jpg?_nc_cat=111&_nc_ht=scontent-lht6-1.xx&oh=d1d4bc6630cfd779dd4b39b7f9b226a2&oe=5D4D630B",
    // }).then(function() {
    //   // Update successful.
    // }).catch(function(error) {
    //   // An error happened.
    // });

  }

  get eF() { return this.emailForm.controls };
  get pF() { return this.passwordForm.controls };

  public updateEmail(): void {
    this.currentUser.updateEmail(this.eF.emailAddress.value)
      .then(function () {
        console.log('email updated');
      }).catch(function (error) {
        this.authService.logout()
          .then(onResolve => this.router.navigate['/']);
        console.log('please log in again before changing password');
      });
  }
}

