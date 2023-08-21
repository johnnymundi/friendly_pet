import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.component.html',
  styleUrls: ['./cartao.component.scss'],
})
export class CartaoComponent implements OnInit {
  @Input() title = 'No title'; // criando o decorator de Input para receber isso como propriedade de quem chamar esse componente
  @Input() description = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

}
