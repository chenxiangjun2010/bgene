import { Component, OnInit, ViewChild ,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import { CountModalComponent } from '../count-modal';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';
@Component({
  selector: 'icebox',
  templateUrl: './icebox.component.html',
  styleUrls: ['./icebox.component.less']
})
export class IceboxComponent implements OnInit {
  
  height='50px';
  form: FormGroup;
  boxform: FormGroup;
  loading = false;
  iceData = [];
  boxData = [];
  sampleData=[];
  modalVisible = false;
  boxModalVisible=false;
  modalTitle = "";
  sampleList=[];
  @Output() voted = new EventEmitter();
  iceModalVisible=false;
  
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: '样本编号', index: 'id' },
    {
      title: '送样编号',
      index: 'code',
    },
    {
      title: '样本类型',
      index: 'type',
    },
    {
      title: '存放位置',
      index: 'position',
    },
    {
      title: '接收时间',
      index: 'time',
      type: 'date',
      sorter: (a: any, b: any) => a.time - b.time,
    }
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
    this.iceData = [{
      name: "冰箱1"
    }, {
      name: "冰箱2"
    }, {
      name: "冰箱3"
    }, {
      name: "冰箱4"
    }
    ]

    for (let i = 0; i < 12; i += 1) {
      const i = Math.ceil(Math.random() * 80);
      this.boxData.push({
        totoal: '80',
        now: `${i}`
      });
    }
    for (let i = 0; i < 80; i += 1) {
      const i = Math.ceil(Math.random() * 80);
      this.sampleData.push({
        totoal: '80',
        now: `${i}`
      });
    }
    

    this.loading = true;
    this.http.get('/list').subscribe((res: any) => {
      console.log(res)
      this.sampleList = res.data;
      this.loading = false;
    });
  }

  initForm(){
    this.form=this.fb.group({
      name:[''],
      cell:[''],
      code:['']
    })
    this.boxform=this.fb.group({
      code:[''],
      sum:['']
    })
  }

  assin() {
    this.modalVisible = true;
    this.modalTitle = "03-5-f";
  }

  openModal(){
    this.iceModalVisible=true;
  }

  addBox(){
    this.boxModalVisible=true;
  }

  vote(){
    this.voted.emit('1');
  }

}
