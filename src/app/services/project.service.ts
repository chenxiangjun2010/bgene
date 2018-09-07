import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '@domain';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { StartupService } from '@core/startup/startup.service';

@Injectable()
export class ProjectService {
    private readonly domain = 'project';

    constructor(private config: StartupService, private http: HttpClient, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    }

    add(project: Project): Observable<Project> {
        console.log(project);
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.post(uri, JSON.stringify(project), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    update(project: Project): Observable<Project> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}/${project.id}`;
        let headers = this.tokenService.get().headers;
        return this.http.patch(uri, JSON.stringify(project), { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

    // del(Project: Project): Observable<any> {
    //     const uri = `${this.config.getConfig('uri')}/${this.domain}/${Project.id}`;
    //     return this.http.delete(uri).pipe(
    //         map(res => res['data'])
    //     )
    // }

    get(): Observable<Project[]> {
        const uri = `${this.config.getConfig('uri')}/${this.domain}`;
        let headers = this.tokenService.get().headers;
        return this.http.get(uri, { headers: headers }).pipe(
            map(res => res['data'])
        )
    }

}
