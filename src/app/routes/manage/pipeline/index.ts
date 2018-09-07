import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { _HttpClient } from '@delon/theme';

@Component({
    selector: 'pipeline',
    templateUrl: './pipeline.component.html',
    styleUrls: ['./pipeline.component.less']
})
export class PipelineComponent implements OnInit {
    q: any = {
        ps: 8,
        categories: [],
        owners: ['zxx'],
    };

    list: any[] = [];

    loading = true;

    // region: cateogry
    categories = [
        { id: 0, text: '临床数据分析流程', value: false },
        { id: 1, text: 'WGS数据分析流程', value: false },
        { id: 2, text: 'WES数据分析流程', value: false },
        { id: 3, text: '转录组分析流程', value: false },
        { id: 4, text: '甲基化分析流程', value: false },
        { id: 5, text: '芯片数据分析流程', value: false },
    ];

    drawervisible = false;


    active = 1;
    profileForm: FormGroup;
    pwd = {
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    };
    // Email
    primary_email = 'cipchk@qq.com';
    panels = [
        {
            active: true, disabled: false, name: '临床数据分析流程',
            childPanel: [
                {
                    active: true, name: '肿瘤测序分析流程', childPanel: [
                        { active: false, name: '实体肿瘤完整版分析流程' },
                        { active: false, name: '血液肿瘤完整版分析流程' },
                        { active: false, name: '肺癌测序分析流程' },
                        { active: false, name: '结直肠癌测序分析流程' },
                        { active: false, name: '肾癌测序分析流程' },
                        { active: false, name: '胃癌测序分析流程' },
                        { active: false, name: '乳腺癌测序分析流程' },
                        { active: false, name: '卵巢癌测序分析流程' },
                        { active: false, name: '宫颈癌测序分析流程' },
                        { active: false, name: '前列腺癌测序分析流程' },
                        { active: false, name: '黑色素瘤测序分析流程' },
                        { active: false, name: '甲状腺癌测序分析流程' },
                        { active: false, name: '淋巴癌测序分析流程' },
                        { active: false, name: '肝癌测序分析流程' },
                        { active: false, name: '食道癌测序分析流程' },
                        { active: false, name: '胰腺癌测序分析流程' },
                        { active: false, name: '膀胱癌测序分析流程' },
                        { active: false, name: '骨癌测序分析流程' },
                    ]
                },
                {
                    active: false, name: '单基因遗传病分析流程', childPanel: [
                        { active: false, name: '单基因病检测完整版分析流程' },
                        { active: false, name: '遗传性耳聋分析流程' },
                        { active: false, name: '地中海贫血分析流程' },
                        { active: false, name: '叶酸代谢测序分析流程' },
                    ]
                },
                {
                    active: false, name: '染色体异常分析流程', childPanel: [
                        { active: false, name: '染色体多倍体变异分析流程' },
                        { active: false, name: '染色体插入分析流程' },
                        { active: false, name: '缺失等结构变异分析流程' },
                    ]
                }
            ]
        },
        { active: false, disabled: true, name: 'WGS数据分析流程' },
        { active: false, disabled: false, name: 'WES数据分析流程' },
        { active: false, disabled: false, name: '转录组分析流程' },
        { active: false, disabled: false, name: '甲基化分析流程' },
        { active: false, disabled: false, name: '芯片数据分析流程' }
    ];

    constructor(fb: FormBuilder, public msg: NzMessageService, private http: _HttpClient) {
        this.profileForm = fb.group({
            name: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(`^[-_a-zA-Z0-9]{4,20}$`),
                ]),
            ],
            email: '',
            bio: [null, Validators.maxLength(160)],
            url: '',
            company: '',
            location: '',
        });
    }

    get name() {
        return this.profileForm.get('name');
    }

    profileSave(event, value) {
        console.log('profile value', value);
    }

    pwdSave() {
        if (!this.pwd.old_password) {
            return this.msg.error('invalid old password');
        }
        if (!this.pwd.new_password) {
            return this.msg.error('invalid new password');
        }
        if (!this.pwd.confirm_new_password) {
            return this.msg.error('invalid confirm new password');
        }
        console.log('pwd value', this.pwd);
    }

    ngOnInit() {
        this.profileForm.patchValue({
            name: 'cipchk',
            email: 'cipchk@qq.com',
        });
        this.getData()
    }

    getData() {
        this.loading = true;
        this.http.get('/api/list', { count: this.q.ps }).subscribe((res: any) => {
            this.list = this.list.concat(res);
            this.loading = false;
        });
    }
    changeCategory(status: boolean, idx: number) {
        if (idx === 0) {
            this.categories.map(i => (i.value = status));
        } else {
            this.categories[idx].value = status;
        }
        this.getData();
    }

    open(): void {
        this.drawervisible = true;
    }

}
