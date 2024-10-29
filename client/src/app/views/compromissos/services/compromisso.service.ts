import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  CompromissoEditadoViewModel,
  CompromissoExcluidoViewModel,
  CompromissoInseridoViewModel,
  EditarComprossimoViewModel,
  InserirCompromissoViewModel,
  ListarCompromissoViewModel,
  VisualizarCompromissoViewModel
  } from '../models/compromisso.model';

@Injectable({
  providedIn: 'root'
})

export class CompromissoService {

  private readonly url = `${environment.apiUrl}/compromissos`;


  constructor(private http: HttpClient) { }

  public inserir(inserirCompromissoVm: InserirCompromissoViewModel): Observable<CompromissoInseridoViewModel> {
    return this.http
    .post<CompromissoInseridoViewModel>(this.url, inserirCompromissoVm)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public editar(id: string, editarCompromissoVm: EditarComprossimoViewModel): Observable<CompromissoEditadoViewModel> {
    const urlCompleto = `${this.url}/${id}`

    return this.http
    .put<CompromissoEditadoViewModel>(urlCompleto, editarCompromissoVm)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public excluir(id: string): Observable<CompromissoExcluidoViewModel> {
    const urlCompleto = `${this.url}/${id}`

    return this.http
    .delete<CompromissoExcluidoViewModel[]>(urlCompleto)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http
    .get(this.url)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  selecionarPorId(id: string): Observable<VisualizarCompromissoViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`

    return this.http
    .get<VisualizarCompromissoViewModel[]>(urlCompleto)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    return of(EMPTY);
  }

  private processarFalha(resposta: any): Observable<never> {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
