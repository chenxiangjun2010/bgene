import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'header-icon',
  template: `
  <nz-dropdown nzTrigger="click" nzPlacement="bottomRight" (nzVisibleChange)="change($event)" [nzClickHide]="true" [(nzVisible)]="visible">
    <div class="item" nz-dropdown>
      <i class="anticon anticon-appstore-o"></i>
    </div>
    <div nz-menu class="wd-xl animated jello">
      <nz-spin [nzSpinning]="loading" [nzTip]="'正在读取数据...'">
        <div nz-row [nzType]="'flex'"  [nzAlign]="'middle'" class="app-icons">
          <div nz-col [nzSpan]="6" (click)="toPeople()">
            <i class="anticon anticon-team bg-error text-white"></i>
            <small>组织架构</small>
          </div>
          <div nz-col [nzSpan]="6" (click)="toHospital()">
            <i class="anticon anticon-idcard bg-cyan text-white"></i>
            <small>客户信息</small>
          </div>
          <div nz-col [nzSpan]="6" (click)="toIceBox()">
            <i class="anticon anticon-database bg-success text-white"></i>
            <small>冰箱信息</small>
          </div>
          <div nz-col [nzSpan]="6" (click)="toTaskResult()">
            <i class="anticon anticon-file bg-purple text-white"></i>
            <small>实验结果</small>
          </div>
          <div nz-col [nzSpan]="6" (click)="toSampleField()">
            <i class="anticon anticon-api bg-warning text-white"></i>
            <small>样本设置</small>
          </div>
          <div nz-col [nzSpan]="6" (click)="setClearTime()">
            <i class="anticon anticon-delete bg-magenta text-white"></i>
            <small>数据清理</small>
          </div>
        </div>
      </nz-spin>
    </div>
  </nz-dropdown>
  <nz-modal [(nzVisible)]="isVisible" nzTitle="数据清理设置" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
    <desc-list size="large"  class="mb-md" [col]="'1'" style="margin-left:40px;">
      <desc-list-item term="清理周期">
        <nz-select style="width: 240px;" [(ngModel)]="selectedValue" nzAllowClear nzPlaceHolder="请选择数据清理周期">
          <nz-option nzValue="1" nzLabel="1个月"></nz-option>
          <nz-option nzValue="2" nzLabel="2个月"></nz-option>
          <nz-option nzValue="3" nzLabel="3个月"></nz-option>
          <nz-option nzValue="4" nzLabel="4个月"></nz-option>
          <nz-option nzValue="5" nzLabel="5个月"></nz-option>
          <nz-option nzValue="6" nzLabel="6个月"></nz-option>
        </nz-select>
      </desc-list-item>
    </desc-list>
    
  </nz-modal>
  `,
})
export class HeaderIconComponent {
  loading = true;
  visible = false;
  isVisible = false;
  constructor(
    private router: Router,
    private modalService: NzModalService,
    private sanitize: DomSanitizer
  ) { }

  change(value) {
    console.log(value)
    setTimeout(() => (this.loading = false), 500);
  }

  toPeople() {
    this.visible = false;
    this.router.navigate(['/layout/info/people']);

  }
  toHospital() {
    this.visible = false;
    this.router.navigate(['/layout/info/hospital']);
  }
  toIceBox() {
    this.visible = false;
    this.router.navigate(['/layout/info/refrigerator']);
  }

  toTaskResult() {
    this.visible = false;
    this.router.navigate(['/layout/info/taskresult']);
  }
  toSampleField() {
    this.visible = false;
    this.router.navigate(['/layout/info/samplefield']);
  }

  setClearTime() {
    this.visible = false;
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
    
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
