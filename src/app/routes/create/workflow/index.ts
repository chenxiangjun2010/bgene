import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { SimpleTableComponent, SimpleTableColumn, SimpleTableData } from '@delon/abc';

@Component({
    selector: 'WorkflowCreate',
    templateUrl: './workflow.component.html',
    styleUrls: ['./workflow.component.less']
})
export class WorkflowCreateComponent implements OnInit {

    q: any = {
        pi: 1,
        ps: 10,
        sorter: '',
        status: null,
        statusList: [],
    };
    data: any[] = [];
    loading = false;
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
    @ViewChild('st') st: SimpleTableComponent;
    columns: SimpleTableColumn[] = [
        { title: '编号', index: 'id', className: 'text-center' },
        { title: '名称', index: 'name', className: 'text-center' },
        { title: '描述', index: 'description', className: 'text-center' },
        { title: '来源', index: 'from', className: 'text-center' },
        { title: '状态', index: 'status', render: 'status', filters: this.status, filter: () => true, className: 'text-center' },
        { title: '更新时间', index: 'updatedAt', type: 'date', sorter: (a: any, b: any) => a.updatedAt - b.updatedAt, className: 'text-center' },
        {
            title: '操作',
            buttons: [
                {
                    text: '修改',
                    click: (item: any) => this.msg.success(`配置${item.no}`),
                },
                {
                    text: '删除',
                    click: (item: any) => this.msg.success(`订阅警报${item.no}`),
                },
            ],
            className: 'text-center'
        },
    ];
    selectedRows: SimpleTableData[] = [];
    description = '';
    totalCallNo = 0;
    expandForm = false;

    constructor(
        private http: _HttpClient,
        public msg: NzMessageService,
        private modalSrv: NzModalService,
    ) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.loading = true;
        this.q.statusList = this.status
            .filter(w => w.checked)
            .map(item => item.index);
        if (this.q.status !== null && this.q.status > -1)
            this.q.statusList.push(this.q.status);
        this.http
            .get('/rule', this.q)
            .pipe(
                map((list: any[]) =>
                    list.map(i => {
                        const statusItem = this.status[i.status];
                        i.statusText = statusItem.text;
                        i.statusType = statusItem.type;
                        return i;
                    }),
                ),
                tap(() => (this.loading = false)),
            )
            .subscribe(res => (this.data = res));
    }

    checkboxChange(list: SimpleTableData[]) {
        this.selectedRows = list;
        this.totalCallNo = this.selectedRows.reduce(
            (total, cv) => total + cv.callNo,
            0,
        );
    }

    reset(ls: any[]) {
        for (const item of ls) item.value = false;
        this.getData();
    }

}
