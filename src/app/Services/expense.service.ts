
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { responseInterface } from '../Util/Interface/responseInterface';
import {SesionService} from '../Services/sesion.service'

@Injectable({
    providedIn: 'root'
})

export class expenseService {

    constructor(private http: HttpClient,
        private sesionServ: SesionService) {

    }

    getAllExpenses() {
        return this.http.get<responseInterface>(environment.urlApi + 'expense')
    }

    createExpense(quantity: string, modelID: string) {
        const headers = {
            'content-type': 'Application/json',
            'Access-Control-Allow-Origin': '*',
        }
        const body = JSON.stringify({
            modelID: modelID,
            quantity:quantity,
            userID: this.sesionServ.userID
        })
        return this.http.post<responseInterface>(environment.urlApi + 'expense', body, { 'headers': headers })
    }

    destroyExpense(expenseID: string) {
        return this.http.delete<responseInterface>(environment.urlApi + 'expense/' + expenseID)
    }
}