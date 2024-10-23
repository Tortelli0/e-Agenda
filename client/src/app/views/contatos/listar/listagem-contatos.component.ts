import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContatoService } from '../services/contato.service';
import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ListarContatoViewModel } from '../models/contato.model';

@Component({
  selector: 'app-listagem-contatos',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './listagem-contatos.component.html'
})

export class ListagemContatosComponent implements OnInit{
  contatos$: Observable<ListarContatoViewModel[]>;

  constructor(private contatoService: ContatoService) {
    this.contatos$ = of([]);
  }

  ngOnInit(): void {
    this.contatos$ = this.contatoService.selecionarTodos();
  }
}
