
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { responseInterface } from '../Util/Interface/responseInterface';
@Injectable({
    providedIn: 'root'
})

export class colorService {

    constructor(private http: HttpClient) {

    }

    getAllColors() {
        return this.http.get<responseInterface>(environment.urlApi + 'color')
    }

    createColor(color: string) {
        const headers = {
            'content-type': 'Application/json',
            'Access-Control-Allow-Origin': '*',
        }
        const body = JSON.stringify({
            description: color
        })
        return this.http.post<responseInterface>(environment.urlApi + 'color', body, { 'headers': headers })
    }

    destroyColor(colorID: string) {
        return this.http.delete<responseInterface>(environment.urlApi + 'color/' + colorID)
    }
}