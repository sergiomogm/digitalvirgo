import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { ApisService } from 'src/app/services/apis.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  dt : string = ''
  fechaenviar : string = ''
  posicion : number = 0
  arraycortado : any[] = []
  api_key : any = ''
  fecha : string[] = []
  datos : any[]= []
  header : any = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', "method": "post" });
  constructor(
    private httpClient : HttpClient,
    public apisService : ApisService
  ) { }

  ngOnInit(): void {
  }
  onChange() : void{
    this.fecha = this.dt.split('-')
    this.fechaenviar = this.fecha[2]+ '-' + this.fecha[1] + '-' + this.fecha[0]
    console.log(this.fechaenviar)
  }
  aumentar() : void{
    
    if(this.posicion + 10 < this.datos.length -1){
        this.posicion = this.posicion+10
        this.recalcular()
      }

  }
  disminuir() : void{
    if(this.posicion > 0){
      this.posicion = this.posicion - 10
      this.recalcular()
    }
  }
  
  enviarFecha() : void{
   const md5 = new Md5();
   this.api_key = md5.appendStr(this.fechaenviar).end()
   console.log(this.api_key)
   this.apisService.llamadaPost(this.api_key).subscribe((data) => {
     this.datos = data.object
     this.apisService.sendData( this.datos )
     this.recalcular()
   })
  }
  recalcular(): void{
    this.arraycortado = this.datos.slice(this.posicion, this.posicion+10)
  }
}
