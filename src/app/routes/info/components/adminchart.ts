import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'admin-chart',
    template: `
    <h4 class="text-center">未完成检测项目</h4>
    <g2-bar height="180" [data]="salesData"></g2-bar>
  `,
})
export class AdminChartComponent implements OnInit {
    salesData: any[] = [];
    taskType = ['抽提', '建库', '测序', '分析']
    constructor(
        private router: Router,
        private http: _HttpClient,
        public msg: NzMessageService,
        private modalService: NzModalService,
    ) { }

    ngOnInit() {
        let array=[];
        for (let i = 0; i < 4; i += 1) {
            array.push({
                x: `${this.taskType[i]}`,
                y: Math.floor(Math.random() * 1000) + 200,
            });
        }

        setTimeout(() => {
            this.salesData = array
        }, 100);
        // this.http.get('/chart').subscribe((res: any) => {

        //     this.salesData = res.salesData;
        // });
    }
}
