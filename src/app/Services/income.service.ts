
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { responseInterface } from '../Util/Interface/responseInterface';
import {SesionService} from '../Services/sesion.service'

@Injectable({
    providedIn: 'root'
})

export class incomeService {

    constructor(private http: HttpClient,
        private sesionServ: SesionService) {

    }

    getAllincomes() {
        return this.http.get<responseInterface>(environment.urlApi + 'income')
    }
    createincome(modelID: string, quantity: string ) {
        const headers = {
            'content-type': 'Application/json',
            'Access-Control-Allow-Origin': '*',
        }
        const body = JSON.stringify({
            modelID: modelID,
            quantity:quantity,
            userID: this.sesionServ.userID
        })
        return this.http.post<responseInterface>(environment.urlApi + 'income', body, { 'headers': headers })
    }

    destroyincome(incomeID: string) {
        return this.http.delete<responseInterface>(environment.urlApi + 'income/' + incomeID)
    }
}