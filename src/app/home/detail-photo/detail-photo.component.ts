import { Photo } from './../photo';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhotosService } from 'src/app/photos.service';

@Component({
  selector: 'app-detail-photo',
  templateUrl: './detail-photo.component.html',
  styleUrls: ['./detail-photo.component.css'],
})
export class DetailPhotoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DetailPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public photo: Photo
  ) {}

  ngOnInit(): void {}

  closePhoto() {
    this.dialogRef.close();
  }
}
