import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
})
export class PetComponent implements OnInit {
  private urlOriginal = '';

  @Input() id: any = '';

  @Input() set photoURL(photoURL: string) {
    if (photoURL.startsWith('data')) {
      this.urlOriginal = photoURL;
    } else {
      this.urlOriginal = `${environment.apiURL}/${photoURL}`;
    }
  }

  get photoURL(): string {
    return this.urlOriginal;
  }

  constructor(private http: HttpClient) { }



  ngOnInit(): void { }
}
