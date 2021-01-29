
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { responseInterface } from '../Util/Interface/responseInterface';
@Injectable({
    providedIn: 'root'
})

export class sizeService {

    constructor(private http: HttpClient) {

    }

    getAllSizes() {
        return this.http.get<responseInterface>(environment.urlApi + 'size')
    }

    createSize(size: string) {
        const headers = {
            'content-type': 'Application/json',
            'Access-Control-Allow-Origin': '*',
        }
        const body = JSON.stringify({
            description: size
        })
        return this.http.post<responseInterface>(environment.urlApi + 'size', body, { 'headers': headers })
    }

    destroySize(sizeID: string) {
        return this.http.delete<responseInterface>(environment.urlApi + 'size/' + sizeID)
    }
}