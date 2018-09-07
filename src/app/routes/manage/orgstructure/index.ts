import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';
@Component({
  selector: 'orgstructure',
  templateUrl: './orgstructure.component.html',
  styleUrls: ['./orgstructure.component.less']
})
export class OrgstructureComponent implements OnInit {

  form: FormGroup;
  hospitalForm:FormGroup;

  hosModalVisible=false;
  hosModalTitle="";
  loading = false;
  modalVisible = false;
  modalTitle = "";

  users = [];
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    {
      title: '姓名',
      index: 'name',
    },
    { title: '用户名', index: 'name' },
    {
      title: '角色',
      index: 'role',
      format: (item) => {
        return '实验人员'
      }
    },
    {
      title: '性别',
      index: 'sex',
    },
    {
      title: '联系方式',
      index: 'tel',
      format: (item) => {
        return '17003298112'
      }
    },
    {
      title: '操作',
      buttons: [
        {
          text: '修改',
          click: (item: any) => {
            this.openModal()
          },
        },
        {
          text: '删除',
          click: (item: any) => {
            this.msg.success('删除成功！')
            // this.delUser(item)
          }
        },
      ],
    },
  ];
  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalService: NzModalService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getData()
    this.initForm()
  }

  getData() {
    this.loading = true;
    this.http.get('/list').subscribe((res: any) => {
      console.log(res)
      this.users = res.data;
      this.loading = false;
    });
  }

  openModal() {
    this.modalVisible = true;
    this.modalTitle = "修改信息"
  }

  openHosModal(){
    this.hosModalVisible = true;
    this.hosModalTitle = "新增"
  }

  initForm() {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      role: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
    });

    this.hospitalForm = this.fb.group({
      hospital: ['', [Validators.required]],
      department: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      adress: ['', [Validators.required]],

    });
  }

}
