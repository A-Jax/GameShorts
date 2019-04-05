import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.authService.authUser();

    this.authService.authUser()
      .subscribe((auth) => {
        if (auth) {
          this.currentUser = firebase.auth().currentUser.displayName;
        } else {
          this.objectKey = this.route.snapshot.params['id'];
        }
      })

  }

  public logOut(): void {
    this.authService.logout()
      .then(onResolve => this.router.navigate['/']);
  }

}
