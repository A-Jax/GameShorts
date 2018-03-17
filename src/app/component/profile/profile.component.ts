import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Observable } from 'rxjs/Observable';
import { GalleryImage } from '../../models/galleryImage.model'
import * as firebase from 'firebase'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  username = firebase.auth().currentUser.displayName;
  email = firebase.auth().currentUser.email;
  constructor() { }

  ngOnInit() {
    


    }


  }

