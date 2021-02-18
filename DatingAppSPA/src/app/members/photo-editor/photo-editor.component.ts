import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { FileUploader } from 'ng2-file-upload';
import { error } from 'protractor';
import { Photo } from 'src/app/_models/photo';
import { AuthService } from 'src/app/_services/Auth.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() mainPhotoChangedUrl = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;
  constructor(private authService: AuthService, private userService: UserService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.initializeUploader();
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'user/' + this.authService.decodeToken().nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        this.notifier.notify("success", "Photo is added successfully");
      }
    };
  }

  setMainPhoto(photo: Photo) {
    var decodeToken = this.authService.decodeToken();
    this.userService.setMainPhoto(decodeToken.nameid, photo.id).subscribe(() => {
      this.currentMain = this.photos.filter(a => a.isMain == true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      // this.mainPhotoChangedUrl.emit(photo.url);
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      console.log("Successful");
      this.notifier.notify("success", "Main Photo changed successfully");


    }, error => {
      this.notifier.notify("error", error);
    });
  }

  deletePhoto(photo: Photo) {
    var check = confirm("Do you want to delete photo?");
    if (check) {
      var decodeToken = this.authService.decodeToken();

      this.userService.deletePhoto(decodeToken.nameid, photo.id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(a => a.id == photo.id), 1);
        this.notifier.notify("success", "Photo is deleted successfully");

      }, err => {
        console.log(err);
        this.notifier.notify("error", "Can not delete photo now");
      });
    }
    else {
      this.notifier.notify("info", "canceled");
    }

  }


}
