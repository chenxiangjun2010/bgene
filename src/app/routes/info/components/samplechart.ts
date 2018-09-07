import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'sample-chart',
    template: `
    <h4 class="text-center">样本录入量 -- 2018</h4>
    <g2-bar height="180" [data]="salesData"></g2-bar>
  `,
})
export class SampleChartComponent implements OnInit {
    salesData:any[]=[];
    constructor(
        private router: Router,
        private http: _HttpClient,
        public msg: NzMessageService,
        private modalService: NzModalService, 
    ) { }

    ngOnInit() {
      this.http.get('/chart').subscribe((res: any) => {

          this.salesData = res.salesData;
        });
    }
}
