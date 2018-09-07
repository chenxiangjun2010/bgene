import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService ,UploadFile } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {
    SimpleTableComponent,
    SimpleTableColumn
} from '@delon/abc'

@Component({
    selector: 'ExpTask',
    templateUrl: './exp.component.html',
    styleUrls: ['./exp.component.less']
})
export class ExpTaskComponent implements OnInit {

    form: FormGroup;
    detailForm: FormGroup;
    modalVisible = false;
    modalTitle = "";
    drawervisible=false;
    thDatas:any[]=[];
    resultThDatas:any[]=[];

    loading=true;
    loading1 = true;

    users1 = [];
    users = [];
    selectedValue2 = "2";
    selectedRows = [];
    allChecked = false;
    indeterminate = false;
    displayData = [];
    uploading = false;
    fileList: UploadFile[] = [];

    @ViewChild('st') st: SimpleTableComponent;
    columns: SimpleTableColumn[] = [
        {
            title: '实验编号',
            render: 'id',
        },
        {
            title: '实验名称',
            index: 'name',
        },
        {
            title: '实验类别',
            index: 'type',
        },
        { title: '实验状态', index: 'condition' },
        {
            title: '创建时间',
            index: 'create_time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
        },
        {
            title: '开始时间',
            index: 'start_time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
        },
        {
            title: '完成时间',
            index: 'end_time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
        },
        {
            title: '操作',
            buttons: [
                {
                    text: '终止',
                    click: (item: any) => {
                        // this.detail(item)
                    },
                },
                {
                    text: '查看详情',
                    click: (item: any) => {
                        this.open(item.type)
                    },
                }
            ],
        },
    ];

    @ViewChild('st1') st1: SimpleTableComponent;
    columns1: SimpleTableColumn[] = [
        { title: '', index: 'id', type: 'checkbox' },
        {
            title: '样本编号',
            render: 'id',
        },
        {
            title: '实验编号',
            index: 'id',
        },
        {
            title: '实验名称',
            index: 'name',
        },
        {
            title: '实验类别',
            index: 'type',
        },
        { title: '实验状态', index: 'condition' },
        {
            title: '创建时间',
            index: 'create_time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
        },
        {
            title: '完成时间',
            index: 'end_time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
        }   
    ];

    @ViewChild('st2') st2: SimpleTableComponent;
    columns2: SimpleTableColumn[] = [
        { title: '', index: 'key', type: 'checkbox' },
        {
            title: '样本编号',
            index: 'id',
        },
        {
            title: '样本状态',
            index: 'condition',
        },
        {
            title: '样本类别',
            index: 'condition',
            format:(item)=>{
                return '血液'
            }
        },
        {
            title: '检测项目编号',
            index: 'id',
        },
        {
            title: '检测项目名称',
            index: 'pro_name',
        },
        {
            title: '创建时间',
            index: 'create_time',
            type: 'date',
            sorter: (a: any, b: any) => a.create_time - b.create_time,
        },
        {
            title: '更新时间',
            index: 'time',
            type: 'date',
            sorter: (a: any, b: any) => a.time - b.time,
        },
    ];

    @ViewChild('st3') st3: SimpleTableComponent;
    columns3: SimpleTableColumn[] = [
        { title: '', index: 'key', type: 'checkbox' },
        {
            title: '样本编号',
            index: 'id',
        },
        {
            title: '样本状态',
            index: 'condition',
        },
        {
            title: '监测项目编号',
            index: 'id',
        },
        {
            title: '监测项目名称',
            index: 'pro_name',
        },
        {
            title: '创建时间',
            index: 'create_time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
        },
        {
            title: '更新时间',
            index: 'time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
        },
        {
            title: '操作',
            buttons: [
              {
                text: '申领',
                click: (item: any) => {
                //   this.openModal()
                    this.msg.success('申领成功！')
                },
                popTitle: '确认申领么',
              },
            ],
          },
    ];

    constructor(
        private http: _HttpClient, 
        public msg: NzMessageService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        // this.getData1();
        this.getData();
        this.initForm();
    }

    openModal() {
        console.log('111')
        this.modalVisible = true;
        this.modalTitle = "新增"
    }

    initForm() {
        this.form = this.fb.group({
            category: ['', [Validators.required]],
            name: ['', [Validators.required]],
            type: ['', [Validators.required]],
            remark: ['', [Validators.required]],
            
        });
        this.detailForm=this.fb.group({})
    }

    getData(){
        this.loading = true;
        this.http.get('/task').subscribe((res: any) => {
            // this.list = this.list.concat(res);
            console.log(res)
            this.users=res.data.map(r => ({...r, checked:false}));
            // this.users1 = res.data;
            this.loading = false;
        });
    }


    close(): void {
        this.drawervisible = false;
    }

    open(type:string){
        console.log(type)
        if(type=="抽提"){
            this.thDatas=[{name:'样本编号'},{name:'存放位置'},{name:'样本类别'},{name:'是否剩余'}]
            this.resultThDatas=[{name:'样本编号'},{name:'浓度'},{name:'含量'},{name:'0D260/280'},{name:'电泳'},{name:'是否合格'}]
        }else if(type=="建库"){
            this.thDatas=[{name:'样本编号'},{name:'DNA浓度'},{name:'DNA总量 '},{name:'0D260/280'},{name:'电泳'},{name:'使用量'}]
            this.resultThDatas=[{name:'样本编号'},{name:'文库浓度'},{name:'文库总量'},{name:'barcode'},{name:'插入片段'},{name:'是否合格'}]
        }else{
            this.thDatas=[{name:'样本编号'},{name:'文库浓度'},{name:'文库总量'},{name:'barcode'},{name:'插入片段'},{name:'使用量'}]
            this.resultThDatas=[{name:'样本编号'},{name:'xx'},{name:'xx'},{name:'是否合格'}]
        }
       
        this.drawervisible=true;
    }

    currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
        this.displayData = $event;
        this.refreshStatus();
    }
    
    refreshStatus(): void {
        const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
        const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
    }

    checkAll(event:boolean){
        this.users.map(user => {
            user.checked = event;
        })
    }

    checkboxChange(list: any[]) {
        this.selectedRows = list;
    }

    selectChange(event:{}){
        this.checkAll(false);
        this.allChecked = false;
    }


    beforeUpload = (file: UploadFile): boolean => {
        this.fileList.push(file);
        return false;
      }
    
      handleUpload(): void {
        const formData = new FormData();
      }
}
