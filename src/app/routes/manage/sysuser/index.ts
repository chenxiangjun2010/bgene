import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
    selector: 'SysuserManage',
    templateUrl: './sysuser.component.html',
    styleUrls: ['./sysuser.component.less']
})
export class SysuserManageComponent implements OnInit {

    form: FormGroup;

    modalVisible = false;
    modalTitle = "";
    constructor(
        private http: _HttpClient,
        public msg: NzMessageService,
        private modalService: NzModalService,
        private router: Router,
        private fb: FormBuilder,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    ) { }

    ngOnInit() {
        this.initForm()
    }

    openModal(){
        this.modalVisible=true;
        this.modalTitle="修改信息"
    }

    initForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            sex: ['', [Validators.required]],
            email: ['', [Validators.required]],
            age: ['', [Validators.required]],
            tel: ['', [Validators.required]],
            adress: ['', [Validators.required]],
            password: ['', [Validators.required]],
            repassword: ['', [Validators.required]],

        });
    }
}
