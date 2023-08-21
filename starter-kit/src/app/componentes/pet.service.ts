import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) { }

  listaPhotos(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/v1/photos`);
  }

  listaOnePhoto(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/v1/photos/${id}`);
  }

  getUsuario(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/v1/users/${id}`)
  }
}
