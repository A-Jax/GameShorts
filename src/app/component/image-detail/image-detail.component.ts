import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { ActivatedRoute } from '@angular/router';
import { GalleryImage } from '../../models/galleryImage.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})

export class ImageDetailComponent implements OnInit {


  public metaTitle: string;
  public metaDesc: string;
  public metaTags: string;
  public metaUrl: string;
  public objectKey = this.route.snapshot.params['id'];

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.imageService.getImage(this.objectKey)
      .then((video) => {
        this.metaUrl = video.url;
        this.metaTitle = video.title;
        this.metaDesc = video.description;
        this.metaTags = video.tags;

      })

  }


}
