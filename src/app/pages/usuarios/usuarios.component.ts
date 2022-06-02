import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuario : any = []
  usuariovisible : any = []
  posicion: number = 0
  listausuarios : any = []
  constructor(
    private activatedRoute : ActivatedRoute,
    private httpClient : HttpClient,
    public apisService : ApisService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(( { login } )=>{
      this.httpClient.get(`https://api.github.com/users/${login}`)
      .subscribe(( data : any ) => {
        this.usuario = data
      })
      this.listausuarios = this.apisService.retornarData()
      if(this.listausuarios != []){
      this.usuariovisible = this.listausuarios.find((cadausuario : any) => cadausuario.login === login)
      
    }
    })
  }
  calcularPosicion() : void{
    this.posicion = this.listausuarios.indexOf(this.usuariovisible)
  }
  aumentar() : void{
    if(this.posicion < this.listausuarios.length){
      this.calcularPosicion()
      this.posicion++
      return this.listausuarios[this.posicion].login
    }
  }
  disminuir() : void{
    this.calcularPosicion()
    if(this.posicion > 0){
      this.posicion--
      return this.listausuarios[this.posicion].login
    }
  }
}
