
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { responseInterface } from '../Util/Interface/responseInterface';
@Injectable({
    providedIn: 'root'
})

export class typeService {

    constructor(private http: HttpClient) {

    }

    getAllTypes() {
        return this.http.get<responseInterface>(environment.urlApi + 'type')
    }

    createType(type: string) {
        const headers = {
            'content-type': 'Application/json',
            'Access-Control-Allow-Origin': '*',
        }
        const body = JSON.stringify({
            description: type
        })
        return this.http.post<responseInterface>(environment.urlApi + 'type', body, { 'headers': headers })
    }

    destroyType(colorID: string) {
        
        return this.http.delete<responseInterface>(environment.urlApi + 'type/' + colorID)
    }
}