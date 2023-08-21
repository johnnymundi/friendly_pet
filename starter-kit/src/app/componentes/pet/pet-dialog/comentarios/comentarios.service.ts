import { Pets } from '@app/componentes/pet';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) { }

  buscaComentario(id: string): Observable<Pets> {
    return this.http.get<Pets>(`${environment.apiURL}/v1/photos/${id}`)
  }

  incluiComentario(id: string, comment: string): Observable<Pets> {
    return this.http.post<Pets>(`${environment.apiURL}/v1/photos/${id}/`, {

    })

  }
}
