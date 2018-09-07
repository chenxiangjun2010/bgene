import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataTaskComponent } from './data';
import { ExpTaskComponent } from './exp';
import { AnsdetailComponent } from './ansdetail';

const routes: Routes = [
    { path: 'data', 
        children: [
            { path: '', component: DataTaskComponent },
            { path: 'analysisdetail', component: AnsdetailComponent , data: { title: '详情' }},
        ],
    },
    { path: 'exp', component: ExpTaskComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TaskRoutingModule { }
