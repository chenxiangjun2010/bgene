import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'sampleStatistics',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.less']
})
export class SampleStatisticsComponent implements OnInit {

    data: any = {
        salesData: [],
        offlineData: [],
    };
    loading = true;

    constructor(private http: _HttpClient, public msg: NzMessageService) { }

    ngOnInit() {
        this.http.get('/chart').subscribe((res: any) => {
            res.offlineData.forEach((item: any) => {
                item.chart = Object.assign([], res.offlineChartData);
            });
            this.data = res;
            this.loading = false;
        });
    }

    _activeTab = 0;
    _tabChange(value: any) {
        console.log('tab', this._activeTab, value);
    }

}
