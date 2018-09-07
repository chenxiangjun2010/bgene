import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
@Component({
  selector: 'assign-modal',
  templateUrl: './assign-modal.component.html',
  styleUrls: ['./assign-modal.component.less']
})
export class AssignModalComponent implements OnInit {

  taskForm: FormGroup;
  form: FormGroup;

  _type: string;
  _data: any;
  result: any;
  loading = false;
  users = []

  @Input()
  set type(value: string) {
    this._type = value;
  }

  @Input()
  set data(value: string) {
    this._data = value;
  }

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    this.loading = true;
    this.http.get('/list').subscribe((res: any) => {
      // this.list = this.list.concat(res);
      console.log(res)
      this.users = res.data;
      this.loading = false;
    });
  }

}
