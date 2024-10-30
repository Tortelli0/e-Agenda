import { ResolveFn } from "@angular/router";
import { ListarDespesaViewModel } from "../models/despesa.model";
import { DespesaService } from "./despesa.service";
import { inject } from "@angular/core";

export const listagemDespesasResolver: ResolveFn<ListarDespesaViewModel[]> = () => {
  return inject(DespesaService).selecionarTodos();
};
