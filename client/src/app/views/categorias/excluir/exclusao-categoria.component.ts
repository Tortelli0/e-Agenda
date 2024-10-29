import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { VisualizarCategoriaViewModel } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-exclusao-categoria',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './exclusao-categoria.component.html',
})

export class ExclusaoCategoriaComponent {
  detalhesCategoria?:  VisualizarCategoriaViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private notificacaoService: NotificacaoService
    ) {}

  ngOnInit(): void {
    this.detalhesCategoria = this.route.snapshot.data['categoria'];
  }

  public excluir() {
    this.categoriaService.excluir(this.detalhesCategoria!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    })
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso(`Categoria excluído com sucesso!`);

    this.router.navigate(['/categorias', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
