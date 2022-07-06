import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private httpClient : HttpClient) { }

  download(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.get('http://localhost:3000/bpc', {
      headers,  
      responseType: 'blob' as 'json'
    })
  }
}
