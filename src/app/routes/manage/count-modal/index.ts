import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'count-modal',
  templateUrl: './count-modal.component.html',
  styleUrls: ['./count-modal.component.less']
})
export class CountModalComponent implements OnInit {

  salesData: any[] = [];
  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.http.get('/chart').subscribe((res: any) => {

      this.salesData = res.salesData;
    });
  }

}
