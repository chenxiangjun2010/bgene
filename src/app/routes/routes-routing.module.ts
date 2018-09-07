import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { UserLoginComponent } from './passport/login/login.component';
import { MyInfoComponent } from './info/mine';
import { PeopleComponent } from './info/people';
import { HospitalComponent } from './info/hospital';
import { RefrigeratorComponent } from './info/refrigerator';
import { TaskResultComponent } from './info/task-result';
import { SampleFieldComponent } from './info/sample-field';
import { ACLGuard } from '@delon/acl';

const routes: Routes = [
    {
        path: 'layout',
        component: LayoutDefaultComponent,
        children: [
            { path: 'info/mine', component: MyInfoComponent },
            // { path: 'info/people', component: PeopleComponent, canActivate: [ACLGuard], data: { guard: '0' } },
            { path: 'info/people', component: PeopleComponent,data: { title: '组织架构信息录入' }},
            { path: 'info/taskresult', component: TaskResultComponent,data: { title: '实验结果设置' }},
            { path: 'info/samplefield', component: SampleFieldComponent,data: { title: '样本字段设置' }},
            { path: 'info/refrigerator', component: RefrigeratorComponent,data: { title: '冰箱信息录入' }},
            { path: 'info/hospital', component: HospitalComponent,data: { title: '客户信息录入' }},
            { path: 'manage', loadChildren: './manage#ManageModule' },
            { path: 'create', loadChildren: './create#CreateModule' },
            { path: 'task', loadChildren: './task#TaskModule' },
            { path: 'statistics', loadChildren: './statistics#StatisticsModule' },
        ],
    },
    {
        path: '',
        component: LayoutPassportComponent,
        children: [
            { path: '', redirectTo: '/passport/login', pathMatch: 'full' },
            { path: 'passport/login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
        ],
    },
    { path: '**', redirectTo: 'info' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule],
})
export class RouteRoutingModule { }
