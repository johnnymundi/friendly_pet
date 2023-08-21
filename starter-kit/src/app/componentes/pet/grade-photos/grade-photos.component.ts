import { Component, Input, OnInit } from '@angular/core';
import { Pets } from '@app/componentes/pet';
import { PetService } from '@app/componentes/pet.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PetDialogComponent } from '../pet-dialog/pet-dialog.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { BehaviorSubject } from 'rxjs';

export interface Pet {
  _id: string;
  url: string;
  title: string;
  description: string;
  likes: [];
  postedBy: number;
}

@Component({
  selector: 'app-grade-photos',
  templateUrl: './grade-photos.component.html',
  styleUrls: ['./grade-photos.component.scss'],
})
export class GradePhotosComponent implements OnInit {
  @Input() pets!: Pets;
  pet!: Pet;
  postedBy!: string;
  likeLength!: number;

  photos: string[] = [];

  constructor(private petService: PetService, private http: HttpClient, public dialog: MatDialog) { }

  getPhotos() {
    Object.entries(this.pets).forEach(([key, value]) => {
      const photo = value.url;
      const title = value.title;
      const id = value._id
      const comments = value.comments
      const description = value.description
      this.photos.push(photo);
      this.photos.push(title)
      this.photos.push(id)
      this.photos.push(comments)
      this.photos.push(description)
    });
    return this.photos.length;
  }

  ngOnInit(): void {
    this.petService.listaPhotos().subscribe((pets) => {
      this.pets = pets.photo;
    });
  }

  // open the modal with the picture info
  async openDialog(petId: string) {

    await this.petService.listaOnePhoto(petId).toPromise().then((pet) => {
      this.pet = pet.photo;
    });

    await this.petService.getUsuario(this.pet.postedBy).toPromise().then(res => {
      this.postedBy = res.name;
    })
    const modalRef = this.dialog.open(PetDialogComponent, {
      width: '1100px',
      height: '650px',
      data: {
        dataKey: this.pet,
      }
    })
    // makes a GET to get the user name because we only have his id so far;

    // passes the data from the picture to the modal;
    modalRef.componentInstance.pet = this.pet;
    modalRef.componentInstance.postedBy = this.postedBy;
    modalRef.componentInstance.photoURL = this.pet.url;
    modalRef.componentInstance.likeLength = this.pet.likes.length;
    //console.log(modalRef)

    modalRef.afterClosed().subscribe(result => {
      this.petService.listaPhotos().subscribe((pets) => {
        this.pets = pets.photo;
      });
    });
  }
}
