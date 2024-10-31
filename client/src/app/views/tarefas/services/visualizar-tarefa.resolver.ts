import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot } from "@angular/router";
import { VisualizarTarefaViewModel } from "../models/tarefa.models";
import { TarefaService } from "./tarefa.service";

export const visualizarTarefaResolver: ResolveFn<VisualizarTarefaViewModel> = ( route: ActivatedRouteSnapshot) => {
  const id = route.params['id'];

  return inject(TarefaService).selecionarPorId(id);
};
