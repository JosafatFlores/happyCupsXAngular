
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { responseInterface } from '../Util/Interface/responseInterface';
@Injectable({
  providedIn: 'root'
})

export class userService {

  constructor(private http: HttpClient, private router: Router) {

  }

  login(userID: String, password: String) {

    const headers = {
      'content-type': 'Application/json',
      'Access-Control-Allow-Origin': '*',
    }
    const body = JSON.stringify({
      userID: userID,
      password: password
    })
    return this.http.post<responseInterface>(environment.urlApi +'user/login', body, { 'headers': headers })
  }

  register(userID: String, password: String, name: String) {

    const headers = {
      'content-type': 'Application/json',
      'Access-Control-Allow-Origin': '*',
    }
    const body = JSON.stringify({
      userID: userID,
      name: name,
      password: password
    })
    return this.http.post<responseInterface>(environment.urlApi +'user', body, { 'headers': headers })
  }
}

