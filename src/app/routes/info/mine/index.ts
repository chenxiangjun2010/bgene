import { Component, OnInit,Inject, ViewChild, enableProdMode, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient, SettingsService } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import {
    SimpleTableComponent,
    SimpleTableColumn,
    SimpleTableData,
} from '@delon/abc'
import { TaskModule } from '../../task';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
    selector: 'MyInfo',
    templateUrl: './mine.component.html',
    styleUrls: ['./mine.component.less']
})
export class MyInfoComponent implements OnInit {
    // 抽提,建库,测序,分析
    extractData: any[] = [];
    arcgisData: any[] = [];
    sequencingData: any[] = [];
    analysisData: any[] = [];

    form: FormGroup;
    modalVisible = false;
    modalTitle = "";
    selectedRows = [];
    allChecked = false;
    indeterminate = false;
    displayData = [];

    users = [
        {
            id: '001',
            name: '任务1',
            project_name: '项目1',
            condition: '进行中',
            create_time: 7526608842000,
            start_time: 1526608842000,
            end_time: 1526608842000,
            time: 1526608842000,
            checked: false
        },
        {
            id: '002',
            name: '任务2',
            project_name: '项目2',
            condition: '进行中',
            create_time: 6526608842000,
            start_time: 1526608842000,
            end_time: 1526608842000,
            time: 1526608842000,
            checked: false
        },
        {
            id: '003',
            name: '任务3',
            project_name: '项目3',
            condition: '进行中',
            create_time: 1526608842000,
            start_time: 1526608842000,
            end_time: 1526608842000,
            time: 1526608842000,
            checked: false
        },
        {
            id: '004',
            name: '任务4',
            project_name: '项目4',
            condition: '进行中',
            create_time: 1526608842000,
            start_time: 1526608842000,
            end_time: 1526608842000,
            time: 1526608842000,
            checked: false
        },
        {
            id: '005',
            name: '任务5',
            project_name: '项目5',
            condition: '未完成',
            create_time: 1526608842000,
            start_time: 1526608842000,
            end_time: 1526608842000,
            time: 1526608842000,
            checked: false
        }
    ];

    columns: SimpleTableColumn[] = [
        {
            title: '实验编号',
            index: 'id',

        },
        {
            title: '实验名称',
            index: 'name',
        },
        { title: '实验状态', index: 'condition' },
        {
            title: '创建时间',
            index: 'create_time',
            type: 'date',
            sorter: (a: any, b: any) => a.create_time - b.create_time,
        },
        {
            title: '开始时间',
            index: 'start_time',
            type: 'date',
            sorter: (a: any, b: any) => a.start_time - b.start_time,
        },
        {
            title: '完成时间',
            index: 'end_time',
            type: 'date',
            sorter: (a: any, b: any) => a.end_time - b.end_time,
        }
    ];

    anycolumns: SimpleTableColumn[] = [
        {
            title: '分析编号',
            index: 'id',

        },
        {
            title: '分析名称',
            index: 'name',
        },
        { title: '分析状态', index: 'condition' },
        {
            title: '创建时间',
            index: 'create_time',
            type: 'date',
            sorter: (a: any, b: any) => a.create_time - b.create_time,
        },
        {
            title: '开始时间',
            index: 'start_time',
            type: 'date',
            sorter: (a: any, b: any) => a.start_time - b.start_time,
        },
        {
            title: '完成时间',
            index: 'end_time',
            type: 'date',
            sorter: (a: any, b: any) => a.end_time - b.end_time,
        }
    ];

    constructor(
        private http: _HttpClient,
        public msg: NzMessageService,
        private modalService: NzModalService,
        private router: Router,
        public settings: SettingsService,
        private fb: FormBuilder,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    ) {
        // this.tokenService.get().roles.map(res => {
            
        // })
     }

    ngOnInit() {
        this.extractData = this.users.map(res => ({ ...res, type: 'extract' }));
        this.arcgisData = this.users.map(res => ({ ...res, type: 'arcgis' }));
        this.analysisData = this.users.map(res => ({ ...res, type: 'analysis' }));
        this.sequencingData = this.users.map(res => ({ ...res, type: 'sequencing' }));
    }

    del() {
        this.msg.success('删除成功！')
    }

    checkboxChange(list: any[]) {
        this.selectedRows = list;
    }

    selectChange(event: {}) {
        this.users.map(user => {
            user.checked = false;
        })
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

}
