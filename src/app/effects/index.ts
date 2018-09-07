import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { HospitalEffects } from './hospital.effects';
import { UserEffects } from './sysuser.effets';
import { SampleEffects } from './sample.effect';
import { ProjectEffects } from './project.effect';
import { DepartmentEffects } from './department.effects';
import { TaskResultEffects } from './taskResult.effets';

@NgModule({
    imports: [
        EffectsModule.forRoot([
            AuthEffects,
            HospitalEffects,
            UserEffects,
            SampleEffects,
            ProjectEffects,
            DepartmentEffects,
            TaskResultEffects
        ]),
    ],
})
export class AppEffectsModule {
}