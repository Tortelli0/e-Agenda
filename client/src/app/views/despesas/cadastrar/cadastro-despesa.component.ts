import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DespesaService } from '../services/despesa.service';
import { DespesaInseridaViewModel, FormaPgtoDespesaEnum, InserirDespesaViewModel } from '../models/despesa.model';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { ListarCategoriaViewModel } from '../../categorias/models/categoria.model';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cadastro-despesa',
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
    MatOption,
    MatSelectModule
  ],
  templateUrl: './cadastro-despesa.component.html',
})

export class CadastroDespesaComponent implements OnInit {
  public form: FormGroup;
  public categorias: ListarCategoriaViewModel[] = [];

  public opcoesPagamento = Object.values(FormaPgtoDespesaEnum).filter((v) => !Number.isFinite(v));

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private despesaService: DespesaService,
    private notificacaoService: NotificacaoService)
    {
    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      valor: [0.0, [Validators.required, Validators.min(1)]],
      data: [new Date().toISOString().substring(0, 10), [Validators.required]],
      formaPagamento: [0, [Validators.required]],
      categoriasSelecionadas: [[], [Validators.required]]
    });
  }

  get descricao() {
    return this.form.get('descricao');
  }

  get valor() {
    return this.form.get('valor');
  }

  get data() {
    return this.form.get('data');
  }

  get formaPagamento() {
    return this.form.get('formaPagamento');
  }

  get categoriasSelecionadas() {
    return this.form.get('categoriasSelecionadas') as FormArray;
  }

  ngOnInit(): void {
    this.categorias = this.route.snapshot.data['categorias'];
  }

  public gravar() {
    if (this.form.invalid) {
      this.notificacaoService.aviso('Por favor, preencha o formulário corretamente!');

      return;
    }

    const inserirDespesa: InserirDespesaViewModel = this.form.value;

    this.despesaService.inserir(inserirDespesa).subscribe({
      next: (despesaInserida) => this.processarSucesso(despesaInserida),
      error: (erro) => this.processarFalha(erro),
    });
  }

  private processarSucesso(despesa: DespesaInseridaViewModel): void {
    this.notificacaoService.sucesso(`Despesa ${despesa.descricao} cadastrada com sucesso!`);

    this.router.navigate(['/despesas', 'listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.message);
  }
}
