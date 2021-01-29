
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { responseInterface } from '../Util/Interface/responseInterface';
import {SesionService} from '../Services/sesion.service'
@Injectable({
    providedIn: 'root'
})

export class modelService {

    constructor(private http: HttpClient,
        private sesionServ: SesionService) {

    }

    getAllModels() {
        return this.http.get<responseInterface>(environment.urlApi + 'model')
    }

    createModel(type: String, color: String, size: String, material: String, capacity: String) {
        const headers = {
            'content-type': 'Application/json',
            'Access-Control-Allow-Origin': '*',
        }
        const body = JSON.stringify({
            typeID: type,
            colorID: color,
            sizeID: size,
            materialID: material,
            capacityID: capacity,
            userID: this.sesionServ.userID
        })
        return this.http.post<responseInterface>(environment.urlApi + 'model', body, { 'headers': headers })
    }

    destroyModel(modelID: string) {
        return this.http.delete<responseInterface>(environment.urlApi + 'model/' + modelID)
    }
}