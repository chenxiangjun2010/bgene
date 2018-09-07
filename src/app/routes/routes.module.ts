import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
import { UserLoginComponent } from './passport/login/login.component';
import { MyInfoComponent } from './info/mine';
import { PeopleComponent } from './info/people';

import { AdminChartComponent } from './info/components/adminchart';
import { TaskChartComponent } from './info/components/taskchart';
import { SampleChartComponent } from './info/components/samplechart';
import { AnsisChartComponent } from './info/components/ansischart';
import { HospitalComponent } from './info/hospital';
import { RefrigeratorComponent } from './info/refrigerator';
import { TaskResultComponent } from './info/task-result';
import { SampleFieldComponent } from './info/sample-field';


const COMPONENTS = [
    UserLoginComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
    imports: [SharedModule, RouteRoutingModule],
    declarations: [
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
        MyInfoComponent,
        PeopleComponent,
        AdminChartComponent,
        TaskChartComponent,
        SampleChartComponent,
        AnsisChartComponent,
        HospitalComponent,
        RefrigeratorComponent,
        TaskResultComponent,
        SampleFieldComponent,
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule { }
