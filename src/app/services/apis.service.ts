import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  arraytransferir: any = []

  constructor(private http : HttpClient) { }
  llamadaPost(api_key : any): Observable<any>{
    const headers = {
      method: 'POST',
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }),
    };
    return this.http
      .post('https://dvapitest.herokuapp.com/api.php', { api_key: api_key }, headers)
      .pipe(retry(1));
      
  }
  sendData(data : any) : void{
    this.arraytransferir = data
  }
  retornarData() : any {
    return this.arraytransferir
  }
  



}
