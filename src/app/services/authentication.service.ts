import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class AuthenticationService {

  private user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,  private db: AngularFireDatabase) {
    this.user = afAuth.authState;
  }

  login(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password) // pass in email and password, call login method.
  }

  logout() {
    return this.afAuth.auth.signOut(); // sign out
  }

  registerAccount(email, password, displayname) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function () {
          // Email sent.
        }).catch((error) => {
          console.log('email not sent')
        });

        user.updateProfile({
          displayName: displayname,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .catch((error) => {
          console.log('displayname not set')
        });

        firebase.database().ref('userNames')
        .push({
          userName: displayname
        })
        
      })
      .catch((error) => {
        console.log('error ' + error)
      });

  }

  authUser() {
    return this.user;
  }

  getUsernames() {
    return this.db.list('userNames')
  }
}
