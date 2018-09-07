import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService, MenuService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

@Component({
    selector: 'header-user',
    template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="item d-flex align-items-center px-sm" nz-dropdown>
      {{tokenService.get().name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item (click)="selfMessage()"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
      <div nz-menu-item (click)="intercalate()"><i class="anticon anticon-setting mr-sm"></i>设置</div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
    </div>
  </nz-dropdown>
  `,
})
export class HeaderUserComponent {
    constructor(
        public settings: SettingsService,
        private router: Router,
        private menuService: MenuService,
        private aclService: ACLService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    ) {
        console.log(this.tokenService.get());
        console.log(this.tokenService.get().roles)
        this.aclService.setRole(this.tokenService.get().roles);
        this.menuService.resume();
    }

    logout() {
        this.tokenService.clear();
        this.router.navigateByUrl(this.tokenService.login_url);
    }

    selfMessage() {
        this.router.navigate(['/layout/manage/sysuser']);
        // this.router.navigateByUrl(this.tokenService.login_url);
    }

    intercalate() {
        this.router.navigate(['/layout/manage/orgstructure']);
        // this.router.navigateByUrl(this.tokenService.login_url);
    }
}
