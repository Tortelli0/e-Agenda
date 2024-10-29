import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CategoriaInseridaViewModel } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-cadastro-categoria',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './cadastro-categoria.component.html',
})

export class CadastroCategoriaComponent {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private categoriaService: CategoriaService, private notificacaoService: NotificacaoService) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    });
  }

  get titulo() {
    return this.form.get('titulo');
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso('Por favor, preencha o formulário corretamente!');

      return;
    }

    const inserirCategoriaVm = this.form.value;

    const observer: PartialObserver<CategoriaInseridaViewModel> = {
      next: (categoriaInserida) => this.processarSucesso(categoriaInserida),
      error: (erro) => this.processarFalha(erro),
    };

    this.categoriaService.inserir(inserirCategoriaVm).subscribe(observer);
  }

  private processarSucesso(categoria: CategoriaInseridaViewModel): void {
    this.notificacaoService.sucesso(`Categoria ${categoria.titulo} cadastrada com sucesso!`);

    this.router.navigate(['/categorias', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }
}
