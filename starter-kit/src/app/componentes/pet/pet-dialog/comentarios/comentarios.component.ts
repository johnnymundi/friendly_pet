import { PetService } from '@app/componentes/pet.service';
import { Pets } from '@app/componentes/pet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentariosService } from './comentarios.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {

  @Input() id!: string;
  comentario$!: Observable<Pets>;
  comentarioForm!: FormGroup;
  petUpdate!: any;

  constructor(private comentarioService: ComentariosService, private formBuilder: FormBuilder, private petService: PetService) { }

  ngOnInit(): void {
    this.comentario$ = this.comentarioService.buscaComentario(this.id);
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.maxLength(300)],
    })
  }


  gravar(): void {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.petService.listaOnePhoto(this.id).subscribe((pet) => {
      this.petUpdate = pet.photo
      console.log(this.petUpdate)

    })
    console.log(this.id)
    console.log(comentario)
    /* this.comentario$ = this.comentarioService.incluiComentario(this.id, comentario).pipe(
      switchMap(() => this.comentarioService.buscaComentario(this.id)), tap(() => {
        this.comentarioForm.reset;
        alert('Salvo comentário');
      })) */
  }

}
