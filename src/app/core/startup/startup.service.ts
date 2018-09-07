import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '@core/i18n/i18n.service';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { Router } from '@angular/router';

@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private translate: TranslateService,
        @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        private httpClient: HttpClient,
    /*     private router: Router, */
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
    ) { }

    private config: Object = null;
    public getConfig(key: any) {
        return this.config[key];
    }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            zip(
                this.httpClient.get(`assets/tmp/i18n/zh-CN.json`),
                this.httpClient.get('assets/tmp/app-data.json'),
            ).pipe(
                catchError(([langData, appData]) => {
                    resolve(null);
                    return [langData, appData];
                }),
            ).subscribe(
                ([langData, appData]) => {
                    this.translate.setTranslation(this.i18n.defaultLang, langData);
                    this.translate.setDefaultLang(this.i18n.defaultLang);
                    const res: any = appData;
                    this.settingService.setApp(res.app);
                    /* this.settingService.setUser(res.user); */
                   /*  if (this.tokenService.get().token) {
                        console.log(this.tokenService.get())
                    } else {
                        this.router.navigate(['/passport/login'])
                    } */
                    /* this.aclService.setFull(true); */
                    console.log('start')
                    this.config = res.api;
                    this.menuService.add(res.menu);
                    this.titleService.suffix = res.app.name;
                },
                () => { },
                () => {
                    resolve(null);
                },
            );
        });
    }
}
