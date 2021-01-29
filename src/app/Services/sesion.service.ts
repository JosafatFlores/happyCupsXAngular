import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class SesionService {
    isUserLoggedIn: boolean = false;

    userID: any;
    userName: any;


    constructor() {
        this.userName = localStorage.getItem('userName')
        this.userID = localStorage.getItem('userID')
        this.isUserLoggedIn = Boolean(localStorage.getItem('isUserLoggedIn'))
    }

    logIn(userName: String, userID: String){
        this.userName = userName
        this.userID =userID
        this.isUserLoggedIn = true

        localStorage.setItem('isUserLoggedIn', String(this.isUserLoggedIn))
        localStorage.setItem('userName', this.userName)
        localStorage.setItem('userID', this.userID)
    }

    logOut(){
        localStorage.clear()
        this.userName = ""
        this.isUserLoggedIn = false
    }

    isLogged() {
        return this.isUserLoggedIn;
    }
}