import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as fromRoot from '../../../reducers';
import * as hospitalActions from '../../../actions/hospital.action';
import * as departmentActions from '../../../actions/department.action';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import { CountModalComponent } from '../count-modal';
import { SimpleTableComponent, SimpleTableColumn, SimpleTableData } from '@delon/abc';
import { PageHeaderComponent } from '@delon/abc';
import { Hospital, Department } from '@domain';

const options = [{
    value: '001',
    label: '001',
    children: [{
        value: '1floor',
        label: '1floor',
        children: [{
            value: '03',
            label: '03',
            isLeaf: true
        }]
    }, {
        value: '2floor',
        label: '2floor',
        isLeaf: true
    }]
}, {
    value: '002',
    label: '002',
    children: [{
        value: '1floor',
        label: '1floor',
        children: [{
            value: '005',
            label: '005',
            isLeaf: true
        }]
    }]
}];

@Component({
    selector: 'SampleManage',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.less']
})
export class SampleManageComponent implements OnInit {

    hospitals$: Observable<Hospital[]>;
    department$: Observable<Department[]>;
    tabs: any[] = [
        {
            key: 'list',
            tab: '样本列表',
        },
        {
            key: 'icebox',
            tab: '存放拓扑图',
        },
        {
            key: 'statistics',
            tab: '样本统计',
        }
    ];
    pos = 0;
    @ViewChild('ph') ph: PageHeaderComponent;


    form: FormGroup;
    loading = false;
    nzList = 'list';
    editCache = false;
    sampleList = [];
    selectedRows = [];

    modalVisible = false;
    modalTitle = "";

    drawervisible = false;
    drawerTitle: string;
    detailData = {};

    columns: SimpleTableColumn[] = [
        { title: '', index: 'key', type: 'checkbox' },
        { title: '样本编号', index: 'id', className: 'text-center' },
        {
            title: '送检编号',
            index: 'code',
            className: 'text-center'
        },
        {
            title: '样本类型',
            index: 'type',
            className: 'text-center'
        },
        {
            title: '存放位置',
            index: 'position',
            className: 'text-center'
        },
        {
            title: '接收时间',
            index: 'time',
            type: 'date',
            className: 'text-center',
            sorter: (a: any, b: any) => a.time - b.time,
        },
        {
            title: '操作',
            className: 'text-center',
            buttons: [
                {
                    text: '详情',
                    click: (item: any) => {
                        this.open()
                    },
                },
                {
                    text: '是否剩余',
                    click: (item: any) => {
                        this.isSurplus()
                        // this.delUser(item)
                    },
                    children: [
                        {
                            text: `剩余`,
                            click: (record: any) =>
                                this.msg.success(`剩余设置成功`),
                            format: (record: any) =>
                                `<i class="anticon anticon-smile-o"></i> 剩余`,

                        },
                        {
                            text: `未剩余`,
                            click: (record: any) => {
                                this.msg.success(`未剩余设置成功`)
                            },
                            format: (record: any) =>
                                `<i class="anticon anticon-frown-o"></i> 未剩余`,
                        },

                    ],

                },
            ],
        },
    ];

    constructor(private store$: Store<fromRoot.State>, private http: _HttpClient, public msg: NzMessageService, private modalService: NzModalService, private router: Router, private fb: FormBuilder) {
        this.store$.dispatch(new hospitalActions.LoadHospitalAction({}));
        this.hospitals$ = this.store$.select(fromRoot.getHospitals);
    }

    ngOnInit(): void {
        this.getData();
        this.initForm();
    }

    getData() {
        this.loading = true;
        this.http.get('/list').subscribe((res: any) => {
            console.log(res)
            this.sampleList = res.data.map(r => ({ ...r, checked: false }));
            this.loading = false;
        });
    }

    initForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            sex: ['', [Validators.required]],
            age: ['', [Validators.required]],
            illness: ['', [Validators.required]],
            hospital: [null, [Validators.required]],
            section: [null, [Validators.required]],
            doctor: [null, [Validators.required]],
            record: ['', [Validators.required]],
            tel: ['', [Validators.required]],
            adress: ['', [Validators.required]],
            inspectionCode: ['', [Validators.required]],
            sampleType: ['', [Validators.required]],
            orgType: ['', [Validators.required]],
            acqTime: ['', [Validators.required]],
            position: [null, [Validators.required]],
            container: ['', [Validators.required]],
            mode: ['', [Validators.required]],
        });
    }

    openModal(t: boolean) {
        this.modalVisible = true;
        if (t) {
            this.modalTitle = "新增"
        } else {
            this.modalTitle = "修改"
        }

    }

    openChart() {
        this.modalService.create({
            nzWidth: 800,
            nzTitle: '显示统计',
            nzContent: CountModalComponent,
            nzClosable: true,
            nzOnOk: () => new Promise((resolve) => {
                window.setTimeout(resolve, 1000)
            }),
            nzComponentParams: {
                type: '1',
                data: '2'
            }
        });
    }

    open(): void {
        this.drawervisible = true;
        this.drawerTitle = "详情"
    }

    edit() {
        this.editCache = true;
        this.drawerTitle = "编辑"
    }

    close(): void {
        this.drawervisible = false;
        this.editCache = false;
    }

    isSurplus() {
        this.msg.success("设置成功")
    }

    submitForm($event, value) {
        $event.preventDefault();
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        console.log(value);
    }

    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.form.reset();
        for (const key in this.form.controls) {
            this.form.controls[key].markAsPristine();
            this.form.controls[key].updateValueAndValidity();
        }
    }

    checkboxChange(list: any[]) {
        this.selectedRows = list;
    }

    onVoted(open) {
        this.openModal(true)
    }

    getSection(hospitalID) {
        console.log("获取科室")
        this.store$.dispatch(new departmentActions.LoadDepartmentAction(hospitalID));
        this.department$ = this.store$.select(fromRoot.getDepartments);
    }

    getDoc() {
        console.log("获取医生")
    }

    to(item: any) {
        console.log(item)
        this.nzList = item.key
        //   this.ph.refresh()
    }

    public nzOptions = options;

    /** ngModel value */
    public values: any[] = null;

    public isVisible = false;

    public onChanges(values: any): void {
        console.log(values, this.values);
    }
}
