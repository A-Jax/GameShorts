import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { P } from '@angular/core/src/render3';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public title: string = 'Gallery';
  public user: Observable<firebase.User>;
  public currentUser: string;
  public objectKey: string;
  public allUsers = new Array<any>();
  public searchForm: FormGroup

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {


    this.searchForm = this.formBuilder.group({
      searchParam: ['', Validators.required]
    })



    this.user = this.authService.authUser();

    this.authService.authUser()
      .subscribe((auth) => {
        if (auth) {
          this.currentUser = firebase.auth().currentUser.displayName;
        } else {
          this.objectKey = this.route.snapshot.params['id'];
        }
      })

    firebase.database().ref('/userNames').once('value')
      .then(snapshot => {
        Object.keys(snapshot.val())
          .map((key, index) => {
            this.allUsers.push(snapshot.val()[key].userName)
          })
      })
  }

  public searchUsers(): void {

    let href = ['/user-not-found'];

    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.searchForm.controls.searchParam.value == this.allUsers[i]) {
        href = [`/gallery/${this.searchForm.controls.searchParam.value}`];
        break;
      }
    }

    this.router.navigateByUrl('/', { skipLocationChange: true }) // router thinks it's loading the same page with the ':' wildcard. Used to override.
      .then(() => { this.router.navigate(href) })

  }

  public logOut(): void {
    this.authService.logout()
      .then(onResolve => this.router.navigate['/']);
  }

}
