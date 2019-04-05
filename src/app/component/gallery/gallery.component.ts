import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Observable } from 'rxjs/Observable';
import { GalleryImage } from '../../models/galleryImage.model'
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ReversePipe } from '../../pipes/reverse.pipe';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges {

  public username: string;
  public images: Observable<GalleryImage[]>;
  public imagesId = new Array<any>();
  public imageUrl: string;
  public imageKey: string;
  public displayName: string;
  public currentUser: string;
  public objectKey = this.route.snapshot.params['id'];

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.imageService.getImages()
      .subscribe((data) => {
        data.forEach(e => {
          this.imageUrl = e.url;
          this.imageKey = e.$key;
        })
      })

    this.images = this.imageService.getImages();
    this.authService.authUser()
      .subscribe(() => {
        this.username = firebase.auth().currentUser.uid;
      })

    this.authService.authUser()
      .subscribe(() => {
        this.displayName = firebase.auth().currentUser.displayName;
      })
  }
  ngOnChanges() {
    this.images = this.imageService.getImages();
  }


  public deleteVideo(key, videoName): void {

    this.imageService.deleteVideo(key, videoName)
    
  }

}
