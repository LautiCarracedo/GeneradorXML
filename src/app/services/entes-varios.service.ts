import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddEntes } from '../models/add-entes';
import { OtrosEntes } from '../models/otros-entes';

@Injectable({
  providedIn: 'root'
})
export class EntesVariosService {

  url = 'http://localhost:3000/otros-entes';
  urlAddEntes = 'http://localhost:3000/agregar-entes';

  constructor(private http: HttpClient) { }

  guardarXMLOtrosEntesGenerado(xmlEntes: OtrosEntes): Observable<any> {
    return this.http.post(this.url, xmlEntes, { responseType: 'text' });
  }

  guardarEnte(enteAAgregar: AddEntes): Observable<any> {
    return this.http.post(this.urlAddEntes, enteAAgregar, { responseType: 'text' });
  }
}
