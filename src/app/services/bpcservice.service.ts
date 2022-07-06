import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BpcIndices } from '../models/bpc-indices';
import { BpcInput } from '../models/bpc-input';
import { BpcUpdate } from '../models/bpc-update';

@Injectable({
  providedIn: 'root'
})
export class BPCServiceService {
  url = 'http://localhost:3000/bpc';

  constructor(private http: HttpClient) { }

  getIndicesValoresBPC():Observable<any> {
    return this.http.get(this.url);
  }

  get(origen: string) {
    let params = new HttpParams();
    if (origen != null) {
      params = params.append('Origen', origen);
    }

    return this.http.get(this.url, { params: params });
  }


  guardarXMLGenerado(xmlBPC: BpcInput): Observable<any> {
    return this.http.post(this.url, xmlBPC, { responseType: 'text' });
  }

  editarIndicesValoresBPC(origen: string, campo: string | null, valores:BpcIndices): Observable<any>{
    return this.http.put(this.url + '/' + origen + '/' + campo, valores, { responseType: 'text' });
  }

  getCampoBPC(origen: string, campo: string): Observable<any>{
    let params = new HttpParams();
    if (origen != null) {
      params = params.append('Origen', origen);
    }
    if (campo != null){
      params = params.append('Campo', campo);
    }
    return this.http.get(this.url + '/' + origen + '/' + campo);
  }
}
