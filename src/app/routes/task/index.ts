import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ExpTaskComponent } from './exp';
import { DataTaskComponent } from './data';
import { TaskRoutingModule } from './task-routing.module';
import { AnsdetailComponent } from './ansdetail';
import { NodeInputfileComponent } from '../manage/node-inputfile';
import { NodeParamsetComponent } from '../manage/node-paramset';
import { NodeSelectfileComponent } from '../manage/node-selectfile';

@NgModule({
    imports: [
        SharedModule,
        TaskRoutingModule,

    ],
    declarations: [ExpTaskComponent, DataTaskComponent,AnsdetailComponent,NodeInputfileComponent,NodeParamsetComponent,
        NodeSelectfileComponent,],
    entryComponents: [ NodeInputfileComponent, NodeParamsetComponent, NodeSelectfileComponent,]
})
export class TaskModule { }
