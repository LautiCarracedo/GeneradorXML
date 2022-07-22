import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AddEntes } from '../models/add-entes';
import { OtrosEntes } from '../models/otros-entes';

@Injectable({
  providedIn: 'root'
})
export class EntesVariosService {

  //url = 'http://localhost:3000/otros-entes';
  url = environment.ConexionWebApiProxy + 'otros-entes';
  //urlAddEntes = 'http://localhost:3000/agregar-entes';
  urlAddEntes = environment.ConexionWebApiProxy + 'agregar-entes';

  constructor(private http: HttpClient) { }

  guardarXMLOtrosEntesGenerado(xmlEntes: OtrosEntes): Observable<any> {
    return this.http.post(this.url, xmlEntes, { responseType: 'text' });
  }

  guardarEnte(enteAAgregar: AddEntes): Observable<any> {
    return this.http.post(this.urlAddEntes, enteAAgregar, { responseType: 'text' });
  }

  getEntesCargados():Observable<any> {
    return this.http.get(this.url);
  }

  editarEnteCargado(origen: string, nroEnte: string, valores: AddEntes): Observable<any>{
    return this.http.put(this.urlAddEntes + '/' + origen + '/' + nroEnte, valores, { responseType: 'text' });
  }

  getEnteSeleccionado(origen: string | null, nroEnte: string | null): Observable<any> {
    let params = new HttpParams();
    if (origen != null) {
      params = params.append('Origen', origen);
    }
    if (nroEnte != null) {
      params = params.append('Nro Ente', nroEnte);
    }

    return this.http.get(this.urlAddEntes + '/' + origen + '/' + nroEnte);
  }
}
