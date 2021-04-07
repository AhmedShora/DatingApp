import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery-9';
import { error } from 'protractor';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/Auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  @ViewChild("memberTabs", { static: true }) memberTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,private userService:UserService,
    private authService:AuthService,private notifier:NotifierService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
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
        description: photo.description
      });
    }
    return imageUrls;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  sendLike(id:number){
    this.userService.sendLike(this.authService.decodeToken().nameid,id).subscribe(data=>{
      this.notifier.notify("success","You Liked "+this.user.knownAs);
    },
    error=>{
      this.notifier.notify("error","You Liked "+this.user.knownAs+" before");

    });
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
