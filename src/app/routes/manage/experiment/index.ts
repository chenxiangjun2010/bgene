import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {
    SimpleTableComponent,
    SimpleTableColumn,
    SimpleTableData,
} from '@delon/abc';

@Component({
    selector: 'ExperimentManage',
    templateUrl: './experiment.component.html',
    styleUrls: ['./experiment.component.less']
})
export class ExperimentManageComponent implements OnInit {
    pos = 0;

    form: FormGroup;
    selectedRows = [];
    modalVisible = false;
    modalTitle = "";
    modalVisibleDetail = false;
    modalTitleDetail = "详情";
    detailData = {};
    currentOrg = null;

    users = [];
    files = [];

    allChecked = false;
    indeterminate = false;
    displayData = [];
    loading = false;
    active: number = 0;

    columns: SimpleTableColumn[] = [
        {
            title: '样本编号',
            index: 'id',
            className: "text-center"
        },
        {
            title: '实验编号',
            index: 'code',
            className: "text-center"
        },
        {
            title: '实验状态',
            index: 'type',
            className: "text-center"
        },
        {
            title: '创建时间',
            index: 'position',
            className: "text-center"
        },
        {
            title: '开始时间',
            index: 'time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
            className: "text-center"
        },
        {
            title: '完成时间',
            index: 'time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
            className: "text-center"
        },
        {
            title: '实验人员',
            index: 'name',
            className: "text-center"
        },
        {
            title: '实验报告编号',
            index: 'code',
            className: "text-center"
        },
    ];

    columns3: SimpleTableColumn[] = [
        { title: '', index: 'key', type: 'checkbox' },
        {
            title: '文件名',
            index: 'name',
            className: "text-center"
        },
        
        {
            title: '文件大小',
            index: 'size',
            className: "text-center"
        },
        { title: '创建时间', index: 'create_time', type: "date" ,className: "text-center"},
        {
            title: '创建人员',
            index: 'create_name',
            className: "text-center"
        },
        {
            title: '预览',
            index: 'file',
            className: "text-center"
        },
        {
            title: '可视化',
            index: 'vision',
            className: "text-center"
        },
        {
            title: '操作',
            className: "text-center",
            buttons: [
                {
                    text: '删除',
                    click: (item: any) => {
                        // this.delUser(item)
                    },
                    type: 'del',
                    pop: true,
                    popTitle: '注意：删除底库时会删除与之关联的人像',
                },
            ],
        },
    ];

    analysis = [
        {
            id: '1',
            name: 'FastQc'
        },
        {
            id: '2',
            name: 'BwA'
        },
        {
            id: '3',
            name: 'samberlast'
        },
        {
            id: '4',
            name: 'sambertool'
        },
        {
            id: '5',
            name: 'sort'
        },
        {
            id: '6',
            name: 'Tk'
        },
        {
            id: '7',
            name: 'TKFastQc'
        },
        {
            id: '8',
            name: 'FtQc'
        },
        {
            id: '9',
            name: 'stQc'
        },
    ]

    constructor(
        private http: _HttpClient,
        public msg: NzMessageService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.initForm();
        this.getData();
        this.getData1();
    }

    getTools = (type: number) => {

        this.active = type;
    }

    getData() {
        this.loading = true;
        this.http.get('/list').subscribe((res: any) => {
            // this.list = this.list.concat(res);
            console.log(res)
            this.users = res.data.map(r => ({ ...r, checked: false }));
            this.loading = false;
        });
    }

    getData1() {
        this.loading = true;
        this.http.get('/file').subscribe((res: any) => {
            // this.list = this.list.concat(res);
            console.log(res)
            this.files = res.data.map(r => ({ ...r, checked: false }));;
            this.loading = false;
        });
    }

    initForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            sex: ['', [Validators.required]],
            age: ['', [Validators.required]],
            illness: ['', [Validators.required]],
            hospital: ['', [Validators.required]],
            section: ['', [Validators.required]],
            doctor: ['', [Validators.required]],
            record: ['', [Validators.required]],
            tel: ['', [Validators.required]],
            adress: ['', [Validators.required]],
            inspectionCode: ['', [Validators.required]],
            sampleType: ['', [Validators.required]],
            orgType: ['', [Validators.required]],
            acqTime: ['', [Validators.required]],
            position: ['', [Validators.required]],
            container: ['', [Validators.required]],
            mode: ['', [Validators.required]],
        });
    }

    openModal() {
        this.modalVisible = true;
        this.modalTitle = "新增"
    }

    detail(item) {
        this.modalVisibleDetail = true;
        this.detailData = item;
        console.log(this.detailData)
    }

    submitForm() {

    }

    resetForm(e) {

    }

    checkboxChange(list: any[]) {
        this.selectedRows = list;
    }

    currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
        this.displayData = $event;
        this.refreshStatus();
    }

    refreshStatus(): void {
        const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
        const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
    }

    checkAll(value: boolean): void {
        this.displayData.forEach(data => {
            if (!data.disabled) {
                data.checked = value;
            }
        });
        this.refreshStatus();
    }

    change(args) {
        console.log(args)
    }
}
