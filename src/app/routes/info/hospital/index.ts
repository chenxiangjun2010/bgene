import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as actions from '../../../actions/hospital.action';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Hospital } from '@domain';
import { HospitalService } from '@services';
import { NzTreeNode } from 'ng-zorro-antd';

@Component({
    selector: 'hospital',
    templateUrl: './hospital.component.html',
    styleUrls: ['./hospital.component.less']
})
export class HospitalComponent implements OnInit {

    list: any[] = [null];
    hospitalVisible = false;
    hospitalTitle = '';

    departVisible = false;
    departTitle = '';
    doctorVisible=false;
    doctorTitle = '';
    loading = false;
    form: FormGroup;
    departmentForm: FormGroup;
    doctorForm: FormGroup;
    
    hospitals$: Observable<Hospital[]>;
    hospitals: any[] = [];
    totalHospital$:Observable<number>;
    totalHospital:number;
    drawervisible = false;
    hospitalAction:String;
    modifyHospital:number;
    alert = 1;
    tabs: any[] = [
        {
          key: 'hospital',
          tab: '医院',
        },
        {
          key: 'department',
          tab: '科室',
        },
        {
            key: 'doctor',
            tab: '医生',
        }
    ];
    pos=0;

    constructor(private http: _HttpClient, public msg: NzMessageService, private fb: FormBuilder, private store$: Store<fromRoot.State>) { }

    ngOnInit() {
        this.initForm();
        this.getData();

    }

    getData() {
        this.loading = true;
        this.store$.dispatch(new actions.LoadHospitalAction({}));
        this.hospitals$ = this.store$.select(fromRoot.getHospitals);
        this.hospitals$.subscribe(hospitals => {
            this.hospitals = hospitals;
            this.totalHospital = this.hospitals.length;
            this.loading = false;
        });
    }

    addHospital() {
        this.hospitalVisible = true;
        this.hospitalTitle = "医院信息录入";
        this.hospitalAction = "add";
        this.initForm();
    }

    addDepartment() {
        this.departVisible = true;
        this.departTitle = "科室信息录入";
    }

    addDoctor() {
        this.doctorVisible = true;
        this.doctorTitle = "医生信息录入";
    }

    initForm() {
        this.form = this.fb.group({
            name: ['',],
            phone: [null, ],
            address: ['', ],
            remark: ['', ]
        });

        this.departmentForm = this.fb.group({
            affiliationHospital: ['', [Validators.required]],
            depName: ['', [Validators.required]],
            depLink: ['', [Validators.required]],
            depRemark: ['', [Validators.required]]
        });

        this.doctorForm = this.fb.group({
            affiliationHospital: ['', [Validators.required]],
            affiliationDep: ['', [Validators.required]],
            doctor: ['', [Validators.required]],
            tel: ['', [Validators.required]],
        });
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
        this.hospitalVisible = false;
        $event.preventDefault();
        for (const key in this.form.controls) {
            this.form.controls[key].markAsDirty();
        }
        if(this.hospitalAction == "add")
        this.store$.dispatch(new actions.AddHospitalAction(value));
        else{
            const updateValue = {id:this.modifyHospital, name:value.name, address:value.address, phone:value.phone, remark:value.remark};
            this.store$.dispatch(new actions.UpdateHospitalAction(updateValue));
        }
    }

    delHospital(hospital:Hospital) {
        this.store$.dispatch(new actions.DeleteHospitalAction(hospital));
    }

    updataHospital(hospital){
        this.hospitalVisible = true;
        this.hospitalTitle = "医院信息录入";
        this.modifyHospital = hospital.id;
        this.form = this.fb.group({
            name: [hospital.name,],
            phone: [hospital.phone, ],
            address: [hospital.address, ],
            remark: [hospital.remark, ]
        });
    }


    onCameraTypeChange(type) {
        switch (type) {
            case 'hospital':
                this.alert = 1;
                break;
            case 'department':
                this.alert = 2;
                break;
            case 'doctor':
                this.alert = 3;
                break;
        }
    }
    mouseAction(name: string, e: any): void {
        console.log(name, e);
        this.drawervisible = true;
    }

    close(): void {
        this.drawervisible = false;
    }
}
