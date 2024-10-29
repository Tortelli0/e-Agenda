import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CategoriaEditadaViewModel } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-edicao-categoria',
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
  templateUrl: './edicao-categoria.component.html',
})

export class EdicaoCategoriaComponent {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private notificacaoService: NotificacaoService)
    {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    });

  }

  ngOnInit(): void {
    const categoria = this.route.snapshot.data['categoria'];

    this.form.patchValue(categoria);
  }

  get titulo() {
    return this.form.get('titulo');
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso('Por favor, preencha o formulário corretamente!');

      return;
    }

    const id = this.route.snapshot.params['id'];
    const editarCategoriaVm = this.form.value;

    const observer: PartialObserver<CategoriaEditadaViewModel> = {
      next: (categoriaEditada) => this.processarSucesso(categoriaEditada),
      error: (erro) => this.processarFalha(erro),
    };

    this.categoriaService.editar(id, editarCategoriaVm).subscribe(observer);
  }

  private processarSucesso(categoria: CategoriaEditadaViewModel): void {
    this.notificacaoService.sucesso(`Categoria ${categoria.titulo} editada com sucesso!`);

    this.router.navigate(['/categorias', 'listar']);
  }

  private processarFalha(erro: Error): any {
    this.notificacaoService.erro(erro.message);
  }
}
