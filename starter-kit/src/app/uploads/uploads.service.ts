import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  constructor(private http: HttpClient) { }

  upload(file: FormData) {
    return this.http.post(`${environment.apiURL}/v1/photos/`, file)
  }

  updatePhoto(id: string, updates: Object) {
    return this.http.put(`${environment.apiURL}/v1/photos/${id}`, updates)
  }
}
