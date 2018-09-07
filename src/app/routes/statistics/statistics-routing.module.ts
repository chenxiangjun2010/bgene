import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataStatisticsComponent } from './data';
import { ExpStatisticsComponent } from './exp';
import { ProjectStatisticsComponent } from './project';
import { SampleStatisticsComponent } from './sample';

const routes: Routes = [
    { path: 'data', component: DataStatisticsComponent },
    { path: 'exp', component: ExpStatisticsComponent },
    { path: 'project', component: ProjectStatisticsComponent },
    { path: 'sample', component: SampleStatisticsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StatisticsRoutingModule { }
