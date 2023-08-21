import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export interface NovoUsuario {
  userName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss'],
})
export class NovoUsuarioComponent implements OnInit {
  cadastroForm!: FormGroup;
  error: string | undefined;
  isLoading = false;

  showMsg: boolean = false;
  showMsgEmail: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) {
    this.createForm();
  }

  ngOnInit(): void { }

  // criar interface que organiza os dados preenchidos pelo usuário na página de cadastro para que seja enviado via post para o backend
  cadastrar() {
    const cadastroNovo = this.cadastroForm.getRawValue();
    console.log(cadastroNovo);
    return this.http.post(`${environment.apiURL}/v1/auth/register`, cadastroNovo).subscribe((dados) => {
      console.log(dados);
      this.showMsg = true;
    }, error => this.showMsgEmail = true)
  }

  private createForm() {
    this.cadastroForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(3)],
      password: ['', Validators.required],
      email: ['', Validators.minLength(3)],
    });
  }
}
