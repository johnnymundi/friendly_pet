import { PetService } from './../../pet.service';
import { UploadsService } from './../../../uploads/uploads.service';
import { AuthenticationService } from '@app/auth';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pets } from '@app/componentes/pet';
import { environment } from '../../../../environments/environment';

export interface Pet {
  _id: string;
  url: string;
  title: string;
  description: string;
  comments: string;
  postedBy: string;
}

@Component({
  selector: 'app-pet-dialog',
  templateUrl: './pet-dialog.component.html',
  styleUrls: ['./pet-dialog.component.scss']
})
export class PetDialogComponent implements OnInit {
  @Input() pet: any;
  private urlOriginal = '';
  @Input() postedBy!: string; // precisei criar essa variável, pois se substituir o postedBy do this.pet para o nome do usuário, vai dar bug no PUT com o id do usuário quando der push no array likes

  // necessário para atribuir os updates do array like
  indexPhoto!: any;

  // estado ativo ou não do click no heart;
  stateFlag: boolean = false;
  likeLength: any;

  // userId antes do like:
  likeUserId!: number;


  constructor(public dialogRef: MatDialogRef<PetDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: Pets, private http: HttpClient, private authService: AuthenticationService, private uploadService: UploadsService, private petService: PetService) { }

  ngOnInit(): void {
    this.likeLength = this.pet.likes.length;
    console.log(this.pet)

  }

  // por alguma razão, só funciona com essa função que tb está no grade-photos pra modificar a url da photo
  @Input() set photoURL(photoURL: string) {
    if (photoURL.startsWith('data')) {
      this.urlOriginal = photoURL;
    } else {
      this.urlOriginal = `${environment.apiURL}/${photoURL}`;
    }
  }

  // converte a url original da imagem para formato que possa ser pego no front
  get photoURL(): string {
    return this.urlOriginal;
  }



  // função para deletar foto ao clicar no ícone da lixeira
  deletePhoto(id: any): void {
    console.log('clicou!')
    const userId = this.authService.getUserId();
    if (userId === this.pet.postedBy) {
      this.http.delete(`${environment.apiURL}/v1/photos/${this.pet._id}`).subscribe((res) => {
        res = 'Deleted successful';
        this.dialogRef.close();
      })
    } else {
      alert("You cannot delete this photo because you didn't post it!")
    }
  }

  // função de dar curtida na foto
  liked() {

    const userId = this.authService.getUserId();
    this.petService.listaOnePhoto(this.pet._id).subscribe((pet) => {
      this.indexPhoto = pet.photo;
      if (this.indexPhoto.likes.includes(userId)) { // se o userId tiver incluso dentro do array, uso splice para retirar
        this.indexPhoto.likes.splice(pet.photo.likes.indexOf(userId), 1);
        this.uploadService.updatePhoto(this.pet._id, this.indexPhoto).subscribe(res => {
          this.likeLength = pet.photo.likes.length;
        });
      } else {
        this.indexPhoto.likes.push(userId)
        this.uploadService.updatePhoto(this.pet._id, this.indexPhoto).subscribe(res => {
          this.likeLength = pet.photo.likes.length;
        });
      }
    })
  }
  // PEGAR O USER ID DO USUARIO QUE ESTA LOGADO OKAAY
  // DAR UM .PUSH NA ARRAY DE LIKES TODA VEZ QUE É DADO UM LIKE COM O USER ID DO USUARIO QUE ESTA LOGADO  OOKAAY
  // CONSTRUIR SEU THIS.PET COM O ATRIBUTO LIKES POPULADO OOKAAY?

}
