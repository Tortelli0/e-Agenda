import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { TipoLocalizacaoCompromissoEnum, VisualizarCompromissoViewModel } from '../models/compromisso.model';
import { CompromissoService } from '../services/compromisso.service';
import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-exclusao-compromisso',
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
  templateUrl: './exclusao-compromisso.component.html',
})

export class ExclusaoCompromissoComponent implements OnInit {

  detalhesCompromisso?:  VisualizarCompromissoViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compromissoService: CompromissoService,
    private notificacaoService: NotificacaoService) {}

  ngOnInit(): void {
    this.detalhesCompromisso = this.route.snapshot.data['compromisso'];
  }

  public excluir() {
    this.compromissoService.excluir(this.detalhesCompromisso!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    })
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso(`Compromisso excluído com sucesso!`);

    this.router.navigate(['/compromissos', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
