import {
  Component,
  HostBinding,
  ViewChild,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
@Component({
  selector: 'ansis-chart',
  template: `
    <h4 class="text-center">检测项目状态</h4>
    <g2-bar height="180" [data]="salesData"></g2-bar>
  `,
})
export class AnsisChartComponent implements OnInit {
  salesData: any[] = [];
  anysisType = ['未处理', '处理中', '未申领']
  constructor(
    private router: Router,
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    let array = []
    for (let i = 0; i < 3; i += 1) {
      array.push({
        x: `${this.anysisType[i]}`,
        y: Math.floor(Math.random() * 1000) + 200,
      });
    }

    setTimeout(() => {
      this.salesData = array
    }, 100);
    // this.http.get('/chart').subscribe((res: any) => {

    //   this.salesData = res.salesData;
    // });
  }
}
