import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { UploadsService } from './uploads.service';
import { Pet } from '@app/componentes/pet';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {

  pet!: Pet;

  formulario!: FormGroup;
  photoId!: FormData;

  // quando a imagem for selecionada
  selectedFile!: File;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private uploadService: UploadsService) { }

  showMsg: boolean = false;

  // necessário para resetar o input da imagem
  @ViewChild('myInput')
  myInputVariable!: ElementRef;

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      title: [null],
      description: [null],
    })
  }

  async onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const foto = event.target.files[0];

      const formData = new FormData();
      formData.append('url', foto)
      this.photoId = formData;

      /*  await this.uploadService.upload(formData).subscribe((res: any) => {
         this.pet = res;
         console.log(this.pet)
       }) */
    }
  }

  /*
  ao escolher a foto, esta é automaticamente tratada pelo onFileSelected, que atribui ao this.photoId o formData com a foto tratada;
  daí, ao clicar em submit, o onUpload primeiro faz um post do this.photoId e depois o resultado do subscribe é atribuído ao this.pet,
  que atribui os valores de title e description à foto;
  */
  onUpload() {
    console.log(this.formulario.value)
    console.log(this.photoId)
    this.uploadService.upload(this.photoId).subscribe((res: any) => {
      this.pet = res;
      this.pet.title = this.formulario.value.title
      this.pet.description = this.formulario.value.description;
      console.log(this.pet)
      this.uploadService.updatePhoto(this.pet._id, this.pet).subscribe(res => {
        console.log(res)
        // tornando true essa variável, a mensagem de upload completo aparece
        this.showMsg = true;
        // reseta o formulário
        this.formulario.reset();
        // reseta o input da imagem
        this.myInputVariable.nativeElement.value = "";
      })

    })

    this.showMsg = false;
  }

  onSubmit() {

  }
}
