import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
const DataSet = require('@antv/data-set');
const sourceData = [
    { name: '未建实验', '抽提': 18.9, '建库': 28.8, '测序': 20 },
    { name: '已建实验', '抽提': 12.4, '建库': 23.2, '测序': 25 },
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
    type: 'fold',
    fields: ['抽提', '建库', '测序'],
    key: '月份',
    value: '月均降雨量',
});

const data = dv.rows;

@Component({
    selector: 'task-chart',
    template: `
    <div nz-col [nzSpan]="12">
        <h4 class="text-center">未被申领的样本</h4>
        <g2-bar height="180" [data]="salesData"></g2-bar>
    </div>
    <div nz-col [nzSpan]="12">
        <h4 class="text-center">以被申领的样本</h4> 
        <div>
            <v-chart [forceFit]="forceFit" [height]="height" [data]="data">
                <v-tooltip></v-tooltip>
                <v-axis></v-axis>
                <v-legend></v-legend>
                <v-bar position="月份*月均降雨量" color="name" [adjust]="adjust"></v-bar>
            </v-chart>
        </div>
    </div>
    
  `,
})
export class TaskChartComponent implements OnInit {
    salesData: any[] = [];
    taskType = ['抽提', '建库', '测序', '分析'];

    forceFit: boolean = true;
    height: number = 200;
    data = data;
    adjust = [{
        type: 'dodge',
        marginRatio: 1 / 16,
    }];
    constructor(
        private router: Router,
        private http: _HttpClient,
        public msg: NzMessageService,
        private modalService: NzModalService,
    ) { }

    ngOnInit() {
        let array = [];
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
