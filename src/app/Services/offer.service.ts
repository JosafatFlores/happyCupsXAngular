
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { responseInterface } from '../Util/Interface/responseInterface';
@Injectable({
    providedIn: 'root'
})

export class offerService {

    constructor(private http: HttpClient) {

    }

    getAllOffers() {
        return this.http.get<responseInterface>(environment.urlApi + 'offer')
    }

    createOffer(modelID: string, minimum: string, free: string) {
        const headers = {
            'content-type': 'Application/json',
            'Access-Control-Allow-Origin': '*',
        }
        const body = JSON.stringify({
            modelID: modelID,
            minimum: minimum,
            free: free
        })
        return this.http.post<responseInterface>(environment.urlApi + 'offer', body, { 'headers': headers })
    }

    destroyOffer(offerID: string) {
        return this.http.delete<responseInterface>(environment.urlApi + 'offer/' + offerID)
    }
}