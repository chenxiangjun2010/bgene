import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CreateRoutingModule } from './create-routing.module';
import { WorkflowCreateComponent } from './workflow';

@NgModule({
    imports: [
        SharedModule,
        CreateRoutingModule,
    ],
    declarations: [
        WorkflowCreateComponent,
    ]
})
export class CreateModule { }
