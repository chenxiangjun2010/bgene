import { Component, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as authActions from '../../../actions/auth.action';
import { SocialService, TokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
    form: FormGroup;
    loading = false;
    interval$: any;

    constructor(
        fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        private store$: Store<fromRoot.State>,
        @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    ) {
        if (this.tokenService.get().token) {
            this.router.navigate(['/layout/info/mine']);
        }
        this.form = fb.group({
            userName: [localStorage.getItem("userName") ? localStorage.getItem("userName") : null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
            password: [localStorage.getItem("password") ? localStorage.getItem("password") : null, Validators.compose([Validators.required, Validators.maxLength(20)])],
            remember: [localStorage.getItem("remember") == 'true' ? true : false],
        });
        if (this.form.controls.remember.value) {
            localStorage.setItem("userName", this.form.controls.userName.value);
            localStorage.setItem("password", this.form.controls.password.value);
        }
    }

    get userName() { return this.form.controls.userName; }
    get password() { return this.form.controls.password; }
    get remember() { return this.form.controls.remember; }

    submit() {
        this.userName.markAsDirty();
        this.userName.updateValueAndValidity();
        this.password.markAsDirty();
        this.password.updateValueAndValidity();
        if (this.userName.invalid || this.password.invalid) return;
        this.store$.dispatch(new authActions.Login({ username: this.userName.value, password: this.password.value }));
        if (this.remember.value) {
            localStorage.setItem("userName", this.form.controls.userName.value);
            localStorage.setItem("password", this.form.controls.password.value);
        } else {
            localStorage.setItem("userName", '');
            localStorage.setItem("password", '');
        }
    }

    rememberChange() {
        let value = this.form.controls.remember.value ? 'false' : 'true';
        localStorage.setItem("remember", value);
    }

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }
}
