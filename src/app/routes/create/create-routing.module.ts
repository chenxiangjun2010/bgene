import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowCreateComponent } from './workflow';

const routes: Routes = [
    { path: 'workflow', component: WorkflowCreateComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CreateRoutingModule { }
