import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery-9';
import { error } from 'protractor';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.galleryOptions = [
      {
        width: '400px',
        height: '400px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description:photo.description
      });
    }
    return imageUrls;
  }

  //we use resolve to be a data provider so we dont need to add ? in HTML for a component
  /*
  loadUser(){
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user:User)=>{
      this.user=user;
    },error=>{
      console.log(error);
    });
  }
  */

}
