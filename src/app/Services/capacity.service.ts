
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { responseInterface } from '../Util/Interface/responseInterface';
@Injectable({
    providedIn: 'root'
})

export class capacityService {

    constructor(private http: HttpClient) {

    }

    getAllCapacitys() {
        return this.http.get<responseInterface>(environment.urlApi + 'capacity')
    }

    createCapacity(capacity: string) {
        const headers = {
            'content-type': 'Application/json',
            'Access-Control-Allow-Origin': '*',
        }
        const body = JSON.stringify({
            description: capacity
        })
        return this.http.post<responseInterface>(environment.urlApi + 'capacity', body, { 'headers': headers })
    }

    destroyCapacity(capacityID: string) {
        return this.http.delete<responseInterface>(environment.urlApi + 'capacity/' + capacityID)
    }
}