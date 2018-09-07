import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hospital } from '@domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class HospitalService {
    private readonly domain = 'hospital';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(hospital: Hospital): Observable<Hospital> {
        console.log(hospital);
        const uri = `${this.config.getConfig('uri')}/${this.domain}/addHospital`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(hospital), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    update(hospital: Hospital): Observable<Hospital> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/hospital/${hospital.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(hospital), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    del(hospital: Hospital): Observable<any> {
        console.log("hospital del");
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${hospital.id}`;
        return this.http.delete(uri).pipe(
            map(res => res['data'])
        )
    }

    get(): Observable<Hospital[]> {
        console.log("hospital get");
        const uri = `${this.config.getConfig('uri')}/${this.domain}/hospital/all`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

}
