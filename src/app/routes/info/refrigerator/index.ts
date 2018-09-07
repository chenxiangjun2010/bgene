import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as actions from '../../../actions/hospital.action';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Hospital } from '@domain';

@Component({
    selector: 'refrigerator',
    templateUrl: './refrigerator.component.html',
    styleUrls: ['./refrigerator.component.less']
})
export class RefrigeratorComponent implements OnInit {
  list: any[] = [null];
  iceModalVisible=false;
  boxModalVisible=false;
  loading = false;
  form: FormGroup;
  boxform: FormGroup;
  modalTitle = "";
  hospitals: any[] = [null];

  constructor(private http: _HttpClient, public msg: NzMessageService, private fb: FormBuilder, private store$: Store<fromRoot.State>) { }

  ngOnInit() {
      this.initForm();
      this.loading = true;
      this.http.get('/api/list', { count: 2 }).subscribe((res: any) => {
          this.hospitals = this.list.concat(res);
          this.loading = false;
      });
      // this.store$.dispatch(new actions.LoadHospitalAction({}));
      // this.store$.select(fromRoot.getHospitals).subscribe(res => {
      //     this.hospitals = this.hospitals.concat(res);
      //     console.log(this.hospitals);
      //     this.loading = false;
      // });
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

  resetForm($event: MouseEvent) {
      $event.preventDefault();
      for (const key in this.form.controls) {
          this.form.controls[key].markAsPristine();
      }
      this.initForm();
  }

  submitForm = ($event, value) => {
      /*    this.loading = true; */
      $event.preventDefault();
      for (const key in this.form.controls) {
          this.form.controls[key].markAsDirty();
      }
      console.log(value);
      /*   setTimeout(() => {
            this.initForm();
            this.addhospitalView = false;
            this.loading = false
        }, this.store$.dispatch(new actions.AddHospitalAction(value))); */
      this.store$.dispatch(new actions.AddHospitalAction(value))
  }

  openModal(){
    this.iceModalVisible=true;
  }

  addBox(type:boolean){
    this.boxModalVisible=true;
    if(type){
      this.modalTitle="新增样本盒"
    }else{
      this.modalTitle="修改样本盒"
    }
  }

}