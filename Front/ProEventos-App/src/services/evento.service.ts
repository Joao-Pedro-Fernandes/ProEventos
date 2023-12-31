import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from 'src/models/Evento';

@Injectable()
export class EventoService {
  baseURL = 'https://localhost:7267/api/Eventos'

constructor(private http: HttpClient) { }

public getEvento(): Observable<Evento[]>  {
  return this.http.get<Evento[]>(this.baseURL);
}

public getEventosByTema(tema: string): Observable<Evento[]>  {
  return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`);
}

public getEventosById(id: number): Observable<Evento>  {
  return this.http.get<Evento>(`${this.baseURL}/${id}`);
}

}
