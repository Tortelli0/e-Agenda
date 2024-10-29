import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ListarCategoriaViewModel } from '../models/categoria.model';

@Component({
  selector: 'app-listagem-categorias',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './listagem-categorias.component.html',
})

export class ListagemCategoriasComponent {
  categorias: ListarCategoriaViewModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categorias = this.route.snapshot.data['categorias'];
  }
}
