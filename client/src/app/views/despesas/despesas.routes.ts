import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { CadastroDespesaComponent } from "./cadastrar/cadastro-despesa.component";
import { EdicaoDespesaComponent } from "./editar/edicao-despesa.component";
import { ExclusaoDespesaComponent } from "./excluir/exclusao-despesa.component";
import { ListagemDespesasComponent } from "./listar/listagem-despesas.component";
import { inject } from "@angular/core";
import { DespesaService } from "./services/despesa.service";
import { VisualizarDespesaViewModel } from "./models/despesa.model";
import { listagemDespesasResolver } from "./services/listagem-despesas.resolver";
import { listagemCategoriasResolver } from "../categorias/services/listagem-categorias.resolver";

const visualizarDespesaResolver: ResolveFn<VisualizarDespesaViewModel> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];

  return inject(DespesaService).selecionarPorId(id);
};

export const despesasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },

  { path: 'listar', component: ListagemDespesasComponent, resolve: { despesas: listagemDespesasResolver, }, },

  { path: 'cadastrar', component: CadastroDespesaComponent, resolve: { categorias: listagemCategoriasResolver } },

  // { path: 'editar/:id', component: EdicaoDespesaComponent, resolve: { despesa: visualizarDespesaResolver, categorias: listarCategoriasResolver }, },

  { path: 'excluir/:id', component: ExclusaoDespesaComponent, resolve: { despesa: visualizarDespesaResolver }, },
];
