import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
    SimpleTableComponent,
    SimpleTableColumn,
    SimpleTableData,
} from '@delon/abc';

@Component({
    selector: 'DataManage',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.less']
})
export class DataManageComponent implements OnInit {

    form: FormGroup;
    selectedRows = [];
    modalVisible = false;
    modalTitle = "";
    modalVisibleDetail = false;
    modalTitleDetail = "详情";
    detailData = {};

    i = 1;
    editCache = {};
    allChecked = false;
    indeterminate = false;
    displayData = [];

    

    users = [
        {
            id:'1',
            type:'血液分析数据',
            sample_id:'1',
            name:'分析文件',
            size:'111111001',
            create_time:1526608842000,
            checked:false,
            create_name:'张三'
        },
        {
            id:'2',
            type:'血液分析数据',
            sample_id:'2',
            name:'分析文件',
            size:'111111001',
            create_time:1526608842000,
            checked:false,
            create_name:'张三'
        },
        {
            id:'3',
            type:'血液分析数据',
            sample_id:'2',
            name:'分析文件',
            size:'111111001',
            create_time:1526608842000,
            checked:false,
            create_name:'张三'
        },
        {
            id:'4',
            type:'血液分析数据',
            sample_id:'2',
            name:'分析文件',
            size:'111111001',
            create_time:1526608842000,
            checked:false,
            create_name:'张三'
        }
    ];
    
    dataSet = [
        {
          key    : '0',
          name   : 'Edward King 0',
          age    : '32',
          address: 'London, Park '
        },
        {
          key    : '1',
          name   : 'Edward King 1',
          age    : '32',
          address: 'London, Park  1'
        }
      ];
    @ViewChild('st') st: SimpleTableComponent;
    columns: SimpleTableColumn[] = [
        { title: '', index: 'key', type: 'checkbox' },
        {
            title: '数据编号',
            index: 'id',
        },
        {
            title: '数据名称',
            index: 'name',
        },
        {
            title: '数据描述',
            index: 'size',
        },
        
        { 
            title: '数据属性',
            index: 'type' ,
        },
        {
            title: '样本编号',
            index: 'id',
        },
        {
            title: '操作',
            buttons: [
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

    constructor(
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit():void {
        this.updateEditCache()
        this.initForm();
    }
    
    log(args: any[]): void {
        console.log(args);
    }
    getData() {

    }

    initForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            sex: ['', [Validators.required]],
            age: ['', [Validators.required]],
            illness: ['', [Validators.required]],
            hospital: ['', [Validators.required]],
            section: ['', [Validators.required]],
            doctor: ['', [Validators.required]],
            record: ['', [Validators.required]],
            tel: ['', [Validators.required]],
            adress: ['', [Validators.required]],
            inspectionCode: ['', [Validators.required]],
            sampleType: ['', [Validators.required]],
            orgType: ['', [Validators.required]],
            acqTime: ['', [Validators.required]],
            position: ['', [Validators.required]],
            container: ['', [Validators.required]],
            mode: ['', [Validators.required]],
        });
    }

    openModal() {
        this.modalVisible = true;
        this.modalTitle = "新增"
    }

    detail(item) {
        this.modalVisibleDetail = true;
        this.detailData = item;
        console.log(this.detailData)
    }

    submitForm() {

    }

    resetForm(e) {

    }

    addRow(): void {
        this.i++;
        let dataSet= [ ...this.dataSet, {
            key    : `${this.i}`,
            name   : `Edward King ${this.i}`,
            age    : '32',
            address: `London, Park Lan ${this.i}`
          } ];
        this.dataSet = [ ...this.dataSet, {
          key    : `${this.i}`,
          name   : `Edward King ${this.i}`,
          age    : '32',
          address: `London, Park Lane ${this.i}`
        } ];
        this.updateEditCache();
      }
    
      deleteRow(i: string): void {
        const dataSet = this.dataSet.filter(d => d.key !== i);
        this.dataSet = dataSet;
      }
    
      startEdit(key: string): void {
        this.editCache[ key ].edit = true;
      }
    
      finishEdit(key: string): void {
        this.editCache[ key ].edit = false;
        this.dataSet.find(item => item.key === key).name = this.editCache[ key ].name;
      }
    
      updateEditCache(): void {
        this.dataSet.forEach(item => {
          if (!this.editCache[ item.key ]) {
            this.editCache[ item.key ] = {
              edit: false,
              name: item.name
            };
          }
        });
      }

      checkboxChange(list: any[]) {
        this.selectedRows = list;
      }

      selectChange(event: {}){
        this.users.map(user => {
            user.checked = false;
        })
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
}