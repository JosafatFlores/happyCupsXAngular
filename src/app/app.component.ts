import { Component } from '@angular/core';
import { SesionService } from './Services/sesion.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public hideNavigation = false;
  usuarioNombreSesion: any
  seccion: any = ""

  constructor(private sesionServ: SesionService) {
    this.hideNavigation = this.sesionServ.isLogged()
  }

  logout() {
    this.hideNavigation = false
    this.sesionServ.logOut()
    window.location.reload();
  }
}



