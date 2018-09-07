import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from '@domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class DepartmentService {
    private readonly domain = 'hospital';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(department: Department): Observable<Department> {
        console.log(department);
        const uri = `${this.config.getConfig('uri')}/${this.domain}/addDepartment`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(department), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    update(department: Department): Observable<Department> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${department.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(department), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    del(department: Department): Observable<any> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${department.id}`;
        return this.http.delete(uri).pipe(
            map(res => res['data'])
        )
    }

    get(): Observable<Department[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/department/all`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

}
