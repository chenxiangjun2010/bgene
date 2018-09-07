import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ProjectStatisticsComponent } from './project';
import { ExpStatisticsComponent } from './exp';
import { DataStatisticsComponent } from './data';
import { SampleStatisticsComponent } from './sample';
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
    imports: [
        SharedModule,
        StatisticsRoutingModule,
    ],
    declarations: [
        ProjectStatisticsComponent,
        ExpStatisticsComponent,
        DataStatisticsComponent,
        SampleStatisticsComponent,
    ]
})
export class StatisticsModule { }
