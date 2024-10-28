import { ListarContatoViewModel } from "../../contatos/models/contato.model";

export interface InserirCompromissoViewModel {
  assunto: string;
  tipoLocal: TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contatoId?: string;
}

export interface CompromissoInseridoViewModel {
  assunto: string;
  tipoLocal: TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contatoId?: string;
}

export interface EditarComprossimoViewModel {
  assunto: string;
  tipoLocal: TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contatoId?: string;
}

export interface CompromissoEditadoViewModel {
  assunto: string;
  tipoLocal: TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contatoId?: string;
}

export interface CompromissoExcluidoViewModel {}

export interface ListarCompromissoViewModel {
  id: string;
  assunto: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
}

export interface VisualizarCompromissoViewModel {
  id: string;
  assunto: string;
  tipoLocal: TipoLocalizacaoCompromissoEnum;
  local?: string;
  link?: string;
  data: Date;
  horaInicio: string;
  horaTermino: string;
  contato: ListarContatoViewModel;
}

export enum TipoLocalizacaoCompromissoEnum {
  Remoto,
  Presencial
}
