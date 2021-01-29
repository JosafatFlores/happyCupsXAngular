
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { responseInterface } from '../Util/Interface/responseInterface';
@Injectable({
    providedIn: 'root'
})

export class materialService {

    constructor(private http: HttpClient) {

    }

    getAllMaterials() {
        return this.http.get<responseInterface>(environment.urlApi + 'material')
    }

    createMaterial(material: string) {
        const headers = {
            'content-type': 'Application/json',
            'Access-Control-Allow-Origin': '*',
        }
        const body = JSON.stringify({
            description: material
        })
        return this.http.post<responseInterface>(environment.urlApi + 'material', body, { 'headers': headers })
    }

    destroyMaterial(materialID: string) {
        return this.http.delete<responseInterface>(environment.urlApi + 'material/' + materialID)
    }
}