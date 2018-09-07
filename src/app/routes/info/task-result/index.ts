import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskResult } from '@domain';
import { TaskResultService } from '@services';
import * as actions from '../../../actions/taskResult.action';

@Component({
  selector: 'task-result',
  templateUrl: './task-result.component.html',
  styleUrls: ['./task-result.component.less']
})
export class TaskResultComponent implements OnInit {

  // region: cateogry
  categories = [
    { id: 0, text: 'tumor', value: false },
    { id: 1, text: 'blood', value: false },
    { id: 2, text: 'FFPE', value: false },
  ];

  // 样本类型
  taskTypes = [{
    name: '数据',
    id: '0'
  },
  {
    name: '文件',
    id: '1'
  }]

  form: FormGroup;
  modalVisible: boolean = false;
  modalTitle: string;
  submitType: string;
  loading: boolean = false;


  taskResult$: Observable<TaskResult[]>;
  taskResults: any[] = [];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalService: NzModalService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private store$: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.initForm()
    this.getData()
  }

  getData() {
    this.loading = true;
    // this.store$.dispatch(new actions.LoadUserAction({}));
    // this.users$ = this.store$.select(fromRoot.getUsers);
    // this.users$.subscribe(users => {
    //   console.log(users)
    //   this.users = users;
    this.loading = false;
    // });
  }


  initForm() {
    this.form = this.fb.group({
      taskType: [null, [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  openModal(type: boolean, item) {
    this.modalVisible = true;
    this.form.reset();
    if (type) {
      this.modalTitle = "新增"
      this.submitType = 'add'
    } else {
      this.modalTitle = "修改"
      this.submitType = 'edit'
      this.form.patchValue({
        id: item.id,
        name: item.name,
        remark: item.remark,
      });
    }

  }

  submitForm = ($event, value) => {
    this.loading = true;
    $event.preventDefault();
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
    }
    console.log(value);
    if (this.submitType == 'add') {
      // this.store$.dispatch(new actions.AddUserAction(value));
    } else {
      // this.store$.dispatch(new actions.UpdateUserAction(value));
    }
  }

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.form.reset();
    for (const key in this.form.controls) {
      this.form.controls[key].markAsPristine();
      this.form.controls[key].updateValueAndValidity();
    }
  }

  preventDefault(e: Event, i): void {
    e.preventDefault();
    e.stopPropagation();
    console.log(i)
    this.categories = this.categories.filter(tag => tag !== i);
    // this.store$.dispatch(new actions.DelUserAction(value));
  }
}