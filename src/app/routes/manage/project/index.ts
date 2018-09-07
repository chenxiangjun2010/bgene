import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadFile , NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import { AssignModalComponent } from '../assign-modal';
import { CountModalComponent } from '../count-modal';
import {
    SimpleTableComponent,
    SimpleTableColumn,
    SimpleTableData,
} from '@delon/abc';
import { SampleService } from '@services';
import { Sample } from '@domain';
import { AddSampleAction } from '../../../actions/sample.action';
import { AnalyzePreDataService } from '@services/analyzePreData.service';
import { AnalyzePreData } from '@domain/analyzePreData';

@Component({
    selector: 'ProjectManage',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.less']
})
export class ProjectManageComponent implements OnInit {

    tabs: any[] = [
        {
            key: 'list',
            tab: '项目列表',
        },
        {
            key: 'sample',
            tab: '可分配样本',
        }
    ];
    pos = 0;
    origin = '0'
    placeholder = "请输入送检编号"

    form: FormGroup;
    selectedRows = [];
    modalVisible = false;
    modalTitle = "";
    modalVisibleDetail = false;
    modalTitleDetail = "详情";
    sampleModalVisible = false;
    sampleModalTitle = "样本详情";
    canModalVisible = false;
    detailData = {};
    loading = false;
    detection = [];
    allChecked = false;
    indeterminate = false;
    displayData = [];

    users = [];

    i = 1;
    editCache = {};
    chooseDatas = [];
    chooseSamples = [];
    unselectedSamples : Sample[];
    unselectedDatas:AnalyzePreData[];
    item = {};
    file: UploadFile;
    image: any;
    addPos = 0;

    columns: SimpleTableColumn[] = [
        { title: '', index: 'key', type: 'checkbox' },
        {
            title: '项目编号',
            index: 'id',
            className: "text-center"
        },
        {
            title: '项目名称',
            index: 'code',
            className: "text-center"
        },
        {
            title: '样本数量',
            index: 'hist',
            className: "text-center",
            type: 'link',
            click: () => {
                this.openSample()
            },
            format: (item) => {
                return '4'
            }
        },
        {
            title: '创建时间',
            index: 'time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
            className: "text-center"
        },
        {
            title: '完成时间',
            index: 'time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
            className: "text-center"
        },
        {
            title: '项目进度',
            index: 'time',
            className: "text-center"
        },
        {
            title: '项目报告',
            index: 'type',
            format: (item) => {
                return '医学报告'
            },
            className: "text-center"
        },
        {
            title: '操作',
            className: "text-center",
            buttons: [
                {
                    text: '分配',
                    acl: ['1'],
                    click: (item: any) => {
                        this.assign()
                    },
                },
                {
                    text: '修改',
                    click: (item: any) => {
                        this.open(false)
                    },
                },
                {
                    text: '查看详情',
                    click: (item: any) => {
                        this.router.navigate(['/layout/manage/project/experiment']);
                        // this.detail(item)
                    },
                },
                {
                    text: '删除',
                    acl: ['1'],
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

    sampleColumns: SimpleTableColumn[] = [
        { title: '', index: 'key', type: 'checkbox' },
        {
            title: '样本编号',
            index: 'id',
            className: "text-center"
        },
        {
            title: '样本状态',
            index: 'status',
            render: 'status',
            className: "text-center"
        },
        {
            title: '检测项目编号',
            index: 'hist',
            className: "text-center",
            format: (item) => {
                return '4'
            }
        },
        {
            title: '检测项目',
            index: 'time',
            format: (item, index) => {
                return '血液检测';
            },
            className: "text-center"
        },
        {
            title: '创建时间',
            index: 'time',
            type: 'date',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
            className: "text-center"
        },

        {
            title: '操作',
            className: "text-center",
            buttons: [
                {
                    text: '分配',
                    click: (item: any) => {
                        this.assign()
                    },
                }
            ],
        },
    ];


    chooseSampleColumns: SimpleTableColumn[] = [
        // { title: '', index: 'key', type: 'checkbox' },
        {
            title: '样本编号',
            index: 'id',
            className: "text-center"
        },
        {
            title: '送检编号',
            index: 'sn',
            className: "text-center"
        },
        // {   
        //     title: '属性',            
        //     render: 'select',            
        //     className: "text-center",        
        // },
        {
            title: '操作',
            className: "text-center",
            buttons: [
                {
                    text: '添加',
                    click: (item: any) => {
                        this.chooseSamples = [ ...this.chooseSamples, {
                            id: item.id,
                            sn: item.sn,
                            property: item.property,
                          }];
                    },
                }
            ],
        },
    ];

    selectedSampleColumns: SimpleTableColumn[] = [
        // { title: '', index: 'key', type: 'checkbox' },
        {
            title: '样本编号',
            index: 'id',
            className: "text-center"
        },
        {
            title: '送检编号',
            index: 'sn',
            className: "text-center"
        },
        {
            title: '属性',
            index: 'property',
            className: "text-center",
        },
        {
            title: '操作',
            className: "text-center",
            buttons: [
                {
                    text: '删除',
                    click: (item: any) => {
                        this.chooseSamples = this.chooseSamples.filter(d => d.id !== item.id);  
                    },
                }
            ],
        },
    ];

    selectedDatasColumns: SimpleTableColumn[] = [
        // { title: '', index: 'key', type: 'checkbox' },
        {
            title: '数据编号',
            index: 'id',
            className: "text-center"
        },
        {
            title: '数据描述',
            index: 'des',
            className: "text-center"
        },
        {
            title: '属性',
            index: 'property',
            className: "text-center",
        },
        {
            title: '操作',
            className: "text-center",
            buttons: [
                {
                    text: '删除',
                    click: (item: any) => {
                        this.chooseDatas = this.chooseDatas.filter(d => d.id !== item.id);
                    },
                }
            ],
        },
    ];

    chooseDataColumns: SimpleTableColumn[] = [
        // { title: '', index: 'key', type: 'checkbox' },
        {
            title: '数据编号',
            index: 'id',
            className: "text-center"
        },
        {
            title: '数据描述',
            index: 'des',
            className: "text-center"
        },
        // {            
        //     title: '属性',           
        //     render: 'select',            
        //     className: "text-center",        
        // },
        {
            title: '操作',
            className: "text-center",
            buttons: [
                {
                    text: '添加',
                    click: (item: any) => {
                        console.log(item)
                    },
                }
            ],
        },
    ];


    constructor(
        private http: _HttpClient,
        public msg: NzMessageService,
        private modalService: NzModalService,
        private sampleService: SampleService,
        private analyzeService:AnalyzePreDataService,
        private router: Router,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.getData();

        this.initForm();
        for (let i = 0; i < 5; i += 1) {
            this.chooseDatas.push({
                id: i,
                type: null
            })
        }
        // for (let i = 0; i < 5; i += 1) {
        //     this.chooseSamples.push({
        //         id: i,
        //         type: null
        //     })
        // }
    }

    log(args: any[]): void {
        console.log(args);
    }

    initForm() {
        this.form = this.fb.group({
            detection: [null, [Validators.required]],
            name: ['', [Validators.required]],
            type: ['', [Validators.required]],
            remark: ['', [Validators.required]]
        });
    }

    openModal() {
        this.modalVisible = true;
        this.modalTitle = "新增"
    }

    detail() {
        this.loading = true;
        this.router.navigate(['/manage/project/experiment']);
        // this.modalVisibleDetail = true;
        // console.log(this.detailData)
    }

    submitForm(value: any) {
        const formData = new FormData();
        this.image = formData;
        formData.append("image", this.image);
        formData.append("type", value.detection);
        formData.append("name", value.name);
        formData.append("remark", value.remark);
        formData.append("seq_type", value.type);
        const sampleData = this.chooseSamples.map(data => ({"id":data.id, "property":data.property}));
        console.log("arr1 = " + sampleData.toString());
        formData.append("sample", sampleData.toString());
       
    }

    resetForm(e) {

    }

    getData() {
        this.loading = true;
        this.http.get('/list').subscribe((res: any) => {
            // this.list = this.list.concat(res);
            console.log(res)
            this.users = res.data.map(r => ({ ...r, checked: false }));
            this.loading = false;
        });
        this.http.get('/detection').subscribe((res: any) => {
            // this.list = this.list.concat(res);
            console.log(res)
            this.detection = res.data
            this.loading = false;
        });
        this.sampleService.get().subscribe(res => {
            this.unselectedSamples = res;

        });
        this.analyzeService.get().subscribe(res =>{
            this.unselectedDatas = res;
        })
    }

    assign() {
        this.modalService.create({
            nzWidth: 800,
            nzTitle: '分配 ',
            nzContent: AssignModalComponent,
            nzClosable: true,
            nzOnOk: () => new Promise((resolve) => {
                this.getData()
                window.setTimeout(resolve, 1000)
            }),
            nzComponentParams: {
                type: '1',
                data: this.pos
            }
        });
    }


    checkAll(event: boolean) {
        this.users.map(user => {
            user.checked = event;
        })
    }


    openChart() {
        this.modalService.create({
            nzWidth: 800,
            nzTitle: '显示统计',
            nzContent: CountModalComponent,
            nzClosable: true,
            nzOnOk: () => new Promise((resolve) => {
                window.setTimeout(resolve, 1000)
            }),
            nzComponentParams: {
                type: '1',
                data: '2'
            }
        });
    }

    openSample() {
        this.sampleModalVisible = true;
        console.log('22')
    }

    selectSample() {
        this.canModalVisible = true;
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

    originChange() {
        if (this.origin == '0') {
            this.placeholder = "请输入送检编号"
        } else {
            this.placeholder = "请输入数据描述"
        }
    }


    visible = false;
    childrenVisible = false;

    vegetables = ['asparagus', 'bamboo', 'potato', 'carrot', 'cilantro', 'potato', 'eggplant'];

    open(type:boolean): void {
        this.visible = true;
        if(type){
            this.modalTitle = "新增"
        }else{
            this.modalTitle = "修改"
        }
        
    }

    close(): void {
        console.log('111')
        this.visible = false;
    }

    openChildren(): void {
        this.childrenVisible = true;
    }

    closeChildren(): void {
        this.childrenVisible = false;
    }

    cancelChildren(): void {
        this.chooseSamples = [];
        this.chooseDatas = [];
        this.childrenVisible = false;
    }

    beforeUpload = (file: UploadFile): boolean => {
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/bmp' && file.type !== 'image/gif') {
            this.msg.error('请上传图片文件!');
            return false
        }
        this.file = file;
    }

}
