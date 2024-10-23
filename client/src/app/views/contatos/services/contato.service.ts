import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { ContatoInseridoViewModel, InserirContatoViewModel, ListarContatoViewModel } from '../models/contato.model';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContatoService {

  private readonly url = `${environment.apiUrl}/contatos`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService ) { }

  inserir(inserirContatoVm: InserirContatoViewModel): Observable<ContatoInseridoViewModel> {
    return this.http.post<ContatoInseridoViewModel>(this.url, inserirContatoVm)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http
    .get<ListarContatoViewModel[]>(this.url)
    .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;

    throw new Error('Erro ao mapear token do usuário.');
  }

  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }

  private obterHeadersAutorizacao() {
    const chave = this.localStorageService.obterTokenAutenticacao()?.chave;

    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chave}`,
      }
    };
  }
}
