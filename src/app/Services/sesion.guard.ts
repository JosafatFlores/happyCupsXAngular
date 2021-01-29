import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionService } from './sesion.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: SesionService, private router: Router){}

  canActivate(
  
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      let sesion: boolean = false;
      if(!this.auth.isLogged()){
        this.router.navigate(['/']);
      }else{
        sesion=true;
      }
    return sesion;
  }

  
}
