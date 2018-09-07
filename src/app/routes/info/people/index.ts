import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '@domain';
import { UserService } from '@services';
import * as actions from '../../../actions/sysuser.action';
import { SimpleTableComponent, SimpleTableColumn } from '@delon/abc';

@Component({
    selector: 'people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.less']
})
export class PeopleComponent implements OnInit {

    users$: Observable<User[]>;
    users: any[] = [];
    totalUser$:Observable<number>;
    totalUser:number;
    submitType: string;

    data: any[] = [];
    messages: any[] = [];
    form: FormGroup;
    loading = false;
    modalVisible = false;
    modalTitle = "";

    passwordProgressMap = {
        ok: 'success',
        pass: 'normal',
        pool: 'exception',
    };
    status = [
        { index: 0, text: '关闭', value: false, type: 'default', checked: false },
        {
            index: 1,
            text: '运行中',
            value: false,
            type: 'processing',
            checked: false,
        },
        { index: 2, text: '已上线', value: false, type: 'success', checked: false },
        { index: 3, text: '异常', value: false, type: 'error', checked: false },
    ];
    drawervisible = false;
    roles = [{ 'id': 1, 'value': '项目负责人' }, { 'id': 2, 'value': '样本录入人' }, { 'id': 3, 'value': '实验人员' }, { 'id': 4, 'value': '分析人员' }, { 'id': 5, 'value': '实验审核人员' }, { 'id': 6, 'value': '分析审核人员' }];
    genders = [{ 'id': 1, 'value': '男' }, { 'id': 2, 'value': '女' }];

    columns: SimpleTableColumn[] = [
        { title: '', index: 'key', type: 'checkbox', className: "text-center" },
        { title: '姓名', render: 'name', className: "text-center" },
        {
            title: '角色', index: 'role', format: (item) => { return '实验人员' }, className: "text-center", filters: [
                { text: 'Admin', value: '0' },
                { text: '项目负责人', value: '1' },
                { text: '样本录入人', value: '2' },
                { text: '实验人员', value: '3' },
                { text: '分析人员', value: '4' },
                { text: '实验审核人员', value: '5' },
                { text: '分析审核人员', value: '6' },
            ],
            filter: () => true,
        },
        {
            title: '性别', index: 'sex', className: "text-center", filters: [
                { text: '男', value: 'male' },
                { text: '女', value: 'female' },
            ],
            type: 'yn',
            ynYes: '女',
            ynNo: '男',
            width: '120px',
            filterMultiple: false,
            filter: () => true,
        },
        { title: '状态', index: 'status', className: "text-center" },
        { title: '联系方式', index: 'tel', format: (item) => { return '17003298112' }, className: "text-center" },
        { title: '更新时间', index: 'status', type: 'date', className: "text-center", sorter: () => true, },
        {
            title: '操作', buttons: [
                // { text: '查看', click: (item: any) => { this.open() }, },
                { text: '修改', click: (item: any) => { this.openModal(false,item) }, },
                { text: '删除', click: (item: any) => { this.msg.success('删除成功！') } },
            ], className: "text-center"
        },
    ];

    constructor(
        private http: _HttpClient,
        public msg: NzMessageService,
        private modalService: NzModalService,
        private router: Router,
        private fb: FormBuilder,
        private store$: Store<fromRoot.State>,
    ) { }

    ngOnInit() {
        this.getData()
        this.initForm()
    }

    getData() {
        this.loading = true;
        this.store$.dispatch(new actions.LoadUserAction({}));
        this.users$ = this.store$.select(fromRoot.getUsers);
        this.users$.subscribe(users => {
            console.log(users)
            this.users = users;
            this.loading = false;
        });
    }

    openModal(type:boolean,users) {
        this.modalVisible = true;
        this.form.reset();
        if(type){
            this.modalTitle = "新增"
            this.submitType = 'add'
        }else{
            this.modalTitle = "编辑"
            this.submitType = 'edit'
            this.form.patchValue({
                id: users.id,
                name: users.name,
                remark: users.remark,
            });
        }
        
    }

    initForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            no: ['',],
            role: [null, [Validators.required]],
            gender: [null, [Validators.required]],
            telephone: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            password: [null, [Validators.required, Validators.minLength(6)]],
            confirmpassword: [null, [Validators.required, Validators.minLength(6), PeopleComponent.passwordEquar]],
        });
    }


    submitForm = ($event, value) => {
        this.loading = true;
        $event.preventDefault();
        for (const key in this.form.controls) {
            this.form.controls[key].markAsDirty();
        }
        console.log(value);
        if(this.submitType == 'add'){
            this.store$.dispatch(new actions.AddUserAction(value));
        }else{
            this.store$.dispatch(new actions.UpdateUserAction(value));
        }
        // setTimeout(() => { this.initForm(); this.modalVisible = false; this.loading = false }, this.store$.dispatch(new actions.AddUserAction(value)));
    }

    resetForm($event: MouseEvent) {
        $event.preventDefault();
        this.form.reset();
        for (const key in this.form.controls) {
	      this.form.controls[ key ].markAsPristine();
	      this.form.controls[ key ].updateValueAndValidity();
	    }
    }

    static passwordEquar(control: FormControl) {
        if (!control || !control.parent) return null;
        if (control.value !== control.parent.get('password').value) {
            return { equar: true };
        }
        return null;
    }

    get password() {
        return this.form.controls.password;
    }
    get confirmpassword() {
        return this.form.controls.confirmpassword;
    }
    get telephone() {
        return this.form.controls.telephone;
    }

    checkboxChange(ret: any) {
        console.log('checkboxChange', ret);
    }

}
