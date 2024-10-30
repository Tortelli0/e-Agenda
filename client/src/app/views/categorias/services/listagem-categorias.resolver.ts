import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { ListarCategoriaViewModel } from "../models/categoria.model";
import { CategoriaService } from "./categoria.service";

export const listagemCategoriasResolver: ResolveFn<ListarCategoriaViewModel[]> = () => {
  return inject (CategoriaService).selecionarTodos();
}
