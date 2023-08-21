import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, public auth: AuthenticationService) {}

  /* getUsers() {
    this.http.get(`${environment.apiURL}/v1/photos/`).subscribe((data) => { console.log(data) })
  } */

  ngOnInit() {}
}
