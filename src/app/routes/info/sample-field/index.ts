import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { inject } from '@angular/core/testing';


@Component({
  selector: 'sample-field',
  templateUrl: './sample-field.component.html',
  styleUrls: ['./sample-field.component.less']
})
export class SampleFieldComponent implements OnInit {

  tags = ['Unremovable', 'Tag 2', 'Tag 3'];
  visible = false;
  isVisible=false;
  drawervisible=false;
  drawerTitle="二级样本类型"
  type="";
  firstField=null;
  childrenVisible = false;

  vegetables = ['BD管抗凝', 'Streck管抗凝', '枸橼酸钠管', 'cfDNA管', '血滤片', '血浆（单独血浆）', '血清（促凝管或单独的血清）'];

  q: any = {
    ps: 8,
    categories: [],
    owners: ['zxx'],
  };

  list: any[] = [];

  loading = true;

  // region: cateogry
  categories = [
    { id: 0, text: 'tumor', value: false },
    { id: 1, text: 'blood', value: false },
    { id: 2, text: 'FFPE', value: false },
  ];
  categories1 = [
    { id: 0, text: '胃', value: false },
    { id: 1, text: '肝', value: false },
    { id: 2, text: '肾', value: false },
    { id: 3, text: '脾', value: false },
  ];

  categories2 = [
    { id: 0, text: '0.7mm试管', value: false },
    { id: 1, text: '1.00mm试管', value: false },
    { id: 2, text: '1.25mm试管', value: false },
    { id: 3, text: '1.50mm试管', value: false },
  ];

  // endregion
  constructor(private http: _HttpClient,
    public msg: NzMessageService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.http.get('/api/list', { count: this.q.ps }).subscribe((res: any) => {
      this.list = this.list.concat(res);
      this.loading = false;
    });
    this.http.get('/sampleField').subscribe((res: any) => {
      this.categories=res.data;
      this.loading = false;
    });
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  preventDefault(e: Event,i,type): void {
    e.preventDefault();
    e.stopPropagation();
    console.log(i)
    console.log(type)
    if(type=="sample"){
      this.categories=this.categories.filter(tag => tag !== i);
    }else if(type=="org"){
      this.categories1=this.categories1.filter(tag => tag !== i);
    }else if(type=="container"){
      this.categories2=this.categories2.filter(tag => tag !== i);
    }
  }
  showInput(): void {
    this.type="新增"
    this.visible = true;
  }

  edit(i){
    this.type="修改"
    this.visible = true;
    console.log(i)
  }

  openContainer(){
    this.type="新增"
    this.isVisible = true;
  }

  editC(){
    this.type="编辑"
    this.isVisible = true;
  }

  handleCancel(){
    this.visible = false;
    this.isVisible=false
  }


  openDraw(i){
    this.firstField=i.label;
    this.drawervisible=true;
  }

  openChildren(): void {
    this.childrenVisible = true;
  }

  closeChildren(): void {
    this.childrenVisible = false;
  }
}