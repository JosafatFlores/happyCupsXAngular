import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { userService } from '../Services/user.service'
import { SesionService } from '../Services/sesion.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {AppComponent} from '../app.component'
import { userInterface } from '../Util/Interface/userInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userServ: userService,
    private sesionServ: SesionService,
    private router: Router,
    private appCom: AppComponent) {

      if(this.sesionServ.isLogged()){
        this.router.navigate(['stock']);
      }
  }

  ngOnInit(): void {

  }

  login(userID: any, password: any) {

    if (userID == "" || password == "") {
      this.openSnackBar("Ingresa usuario y contraseña", "OK")
    } else {
      this.userServ.login(userID, password).subscribe((res) => {
        if (res.code == 1) {
          var userName: String = ""
          var data: [userInterface] = res.result
          this.sesionServ.logIn(data[0].name, userID)
          this.appCom.hideNavigation = true 
          this.router.navigate(['stock']);
        } else if (res.code == 2) {
          this.openSnackBar("Datos de usuario/contraseña son incorrectos", "OK")
        }
      })

    }
  }

  newUser() {
    const dialogRef = this.dialog.open(newUser, {
      width: '50%',
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

@Component({
  selector: 'newUser',
  templateUrl: 'newUser.dialog.html',
  styleUrls: ['./newUser.dialog.css']
})
export class newUser {

  constructor(
    private snackBar: MatSnackBar,
    private userServ: userService,
    public dialogRef: MatDialogRef<newUser>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  register(userID: String, password: String, name: String) {
    if(userID == "" || password == "" || name == ""){
      this.openSnackBar("Todos los campos son obligatorios", "OK")
    }else{
      this.userServ.register(userID, password, name).subscribe((res) => {
        
        if (res.code == 1) {
          this.openSnackBar("Usuario registrado", "OK")
          this.dialogRef.close();
        }else if (res.code == 4) {
          this.openSnackBar("Usuario no disponible", "OK")
        }
      })
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}