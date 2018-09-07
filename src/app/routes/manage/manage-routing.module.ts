import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataManageComponent } from './data';
import { ProjectManageComponent } from './project';
import { SampleManageComponent } from './sample';
import { SysuserManageComponent } from './sysuser';
import { WorkflowManageComponent } from './workflow';
import { ExperimentManageComponent } from './experiment';
import { DatabaseComponent } from './database';
import { OrgstructureComponent } from './orgstructure';
import { IceboxComponent } from './icebox';
import { PipelineComponent } from './pipeline';

const routes: Routes = [
    { path: 'data', component: DataManageComponent },
    {
        path: 'project',
        children: [
            { path: '', component: ProjectManageComponent },
            { path: 'experiment', component: ExperimentManageComponent, data: { title: '检测项目详情' } },
        ],
    },
    { path: 'sample', component: SampleManageComponent },
    { path: 'sysuser', component: SysuserManageComponent, data: { title: '个人中心' } },
    { path: 'workflow', component: WorkflowManageComponent },
    { path: 'database', component: DatabaseComponent },
    { path: 'icebox', component: IceboxComponent },
    { path: 'pipeline', component: PipelineComponent },
    { path: 'orgstructure', component: OrgstructureComponent, data: { title: '设置' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageRoutingModule { }
