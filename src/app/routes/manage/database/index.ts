import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';

@Component({
  selector: 'database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.less']
})
export class DatabaseComponent implements OnInit {

  form: FormGroup;
  modalVisible = false;
  modalTitle = "";

  q: any = {
    ps: 8,
    categories: [],
    owners: ['zxx'],
  };

  list: any[] = [];

  loading = true;

  // region: cateogry
  categories = [
    { id: 0, text: '全部', value: false },
    { id: 1, text: '类目一', value: false },
    { id: 2, text: '类目二', value: false },
    { id: 3, text: '类目三', value: false },
    { id: 4, text: '类目四', value: false },
    { id: 5, text: '类目五', value: false },
    { id: 6, text: '类目六', value: false },
    { id: 7, text: '类目七', value: false },
    { id: 8, text: '类目八', value: false },
    { id: 9, text: '类目九', value: false },
    { id: 10, text: '类目十', value: false },
    { id: 11, text: '类目十一', value: false },
    { id: 12, text: '类目十二', value: false },
  ];

  changeCategory(status: boolean, idx: number) {
    if (idx === 0) {
      this.categories.map(i => (i.value = status));
    } else {
      this.categories[idx].value = status;
    }
    this.getData();
  }

  users = [
    {
     name:"样本数据库",
     dis:"存放样本",
     remark:'勿删'
    },
    {
      name:"实验数据数据库",
      dis:"存放实验数据",
      remark:'勿删'
     },
     {
      name:"样本数据库2",
      dis:"存放样本",
      remark:'勿删'
     },
  ];
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    {
      title: '数据库名称',
      index: 'name',
    },
    {
      title: '数据库描述',
      index: 'dis',
    },
    {
      title: '数据库备注',
      index: 'remark',
    },
    {
      title: '操作',
      buttons: [
        {
          text: '修改',
          click: (item: any) => {
            // this.openModal()
          },
        },
        {
          text: '删除',
          click: (item: any) => {
            // this.delUser(item)
          },
          type: 'del',
          pop: true,
          popTitle: '注意：删除底库时会删除与之关联的人像',
        },
      ],
    },
  ];
  // endregion
  constructor(private http: _HttpClient, 
    public msg: NzMessageService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getData();
    this.initForm();
  }

  getData() {
    this.loading = true;
    this.http.get('/api/list', { count: this.q.ps }).subscribe((res: any) => {
      this.list = this.list.concat(res);
      this.loading = false;
    });
  }

  openModal() {
    this.modalVisible = true;
    this.modalTitle = "新增"
  }

  initForm() {
    this.form = this.fb.group({
        name: ['', [Validators.required]],
        sex: ['', [Validators.required]],
        type: [null, [Validators.required]],
        age: ['', [Validators.required]],
    });
}
}
