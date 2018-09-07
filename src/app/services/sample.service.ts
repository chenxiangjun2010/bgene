import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sample } from '@domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class SampleService {
    private readonly domain = 'sample';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(sample: Sample): Observable<Sample> {
        console.log(sample);
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(sample), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    update(sample: Sample): Observable<Sample> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${sample.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(sample), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    // del(sample: Sample): Observable<any> {
    //     const uri = `${this.config.getConfig('uri')}/${this.domain}/${sample.id}`;
    //     return this.http.delete(uri).pipe(
    //         map(res => res['data'])
    //     )
    // }

    get(): Observable<Sample[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri).pipe(
            map(res => res['data'])
        )
    }



}
