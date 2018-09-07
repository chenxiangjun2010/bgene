import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ManageRoutingModule } from './manage-routing.module';
import { DataManageComponent } from './data';
import { ProjectManageComponent } from './project';
import { SampleManageComponent } from './sample';
import { SysuserManageComponent } from './sysuser';
import { WorkflowManageComponent } from './workflow';
import { ExperimentManageComponent } from './experiment';
import { DatabaseComponent } from './database';
import { AssignModalComponent } from './assign-modal';
import { CountModalComponent } from './count-modal';
import { NodeInputfileComponent } from './node-inputfile';
import { OrgstructureComponent } from './orgstructure';
import { IceboxComponent } from './icebox';
import { NodeParamsetComponent } from './node-paramset';
import { NodeSelectfileComponent } from './node-selectfile';
import { SampleStatisticsComponent } from '../statistics/sample';
import { PipelineComponent } from './pipeline';

@NgModule({
    imports: [
        SharedModule,
        ManageRoutingModule,
    ],
    declarations: [
        DataManageComponent,
        ProjectManageComponent,
        SampleManageComponent,
        SysuserManageComponent,
        WorkflowManageComponent,
        ExperimentManageComponent,
        DatabaseComponent,
        AssignModalComponent,
        CountModalComponent,
        OrgstructureComponent,
        IceboxComponent,
        SampleStatisticsComponent,
        PipelineComponent,
    ],
    entryComponents: [AssignModalComponent, CountModalComponent,]
})
export class ManageModule { }
