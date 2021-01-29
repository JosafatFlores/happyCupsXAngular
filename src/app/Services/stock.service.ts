
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { responseInterface } from '../Util/Interface/responseInterface';
@Injectable({
    providedIn: 'root'
})

export class stockService {

    constructor(private http: HttpClient) {

    }

    getAllStock() {
        
        return this.http.get<responseInterface>(environment.urlApi + 'stock')
    }
}