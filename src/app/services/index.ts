import { NgModule } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { HospitalService } from '@services/hospital.service';
import { UserService } from '@services/user.service';
import { SampleService } from '@services/sample.service';
import { ProjectService } from '@services/project.service';
import { AnalyzePreDataService } from "@services/analyzePreData.service";
import { DepartmentService } from '@services/department.service';
import { TaskResultService } from '@services/taskResult.service';

export {
    AuthService,
    HospitalService,
    UserService,
    SampleService,
    ProjectService,
    AnalyzePreDataService,
    DepartmentService,
    TaskResultService
}

@NgModule()
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [
                AuthService,
                HospitalService,
                UserService,
                SampleService,
                ProjectService,
                AnalyzePreDataService,
                DepartmentService,
                TaskResultService
            ]
        };
    }
}