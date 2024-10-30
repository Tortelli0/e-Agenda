import { Routes } from "@angular/router";
import { CadastroDespesaComponent } from "./cadastrar/cadastro-despesa.component";
import { EdicaoDespesaComponent } from "./editar/edicao-despesa.component";
import { ExclusaoDespesaComponent } from "./excluir/exclusao-despesa.component";
import { ListagemDespesasComponent } from "./listar/listagem-despesas.component";
import { listagemDespesasResolver } from "./services/listagem-despesas.resolver";
import { listagemCategoriasResolver } from "../categorias/services/listagem-categorias.resolver";
import { visualizarDespesaResolver } from "./services/visualizar-despesa.resolver";

export const despesasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },

  { path: 'listar', component: ListagemDespesasComponent, resolve: { despesas: listagemDespesasResolver, }, },

  { path: 'cadastrar', component: CadastroDespesaComponent, resolve: { categorias: listagemCategoriasResolver } },

  { path: 'editar/:id', component: EdicaoDespesaComponent, resolve: { despesa: visualizarDespesaResolver, categorias: listagemCategoriasResolver }, },

  { path: 'excluir/:id', component: ExclusaoDespesaComponent, resolve: { despesa: visualizarDespesaResolver }, },
];
