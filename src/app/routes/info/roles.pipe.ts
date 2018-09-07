import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roles' })
export class RolesPipe implements PipeTransform {
    transform(value: any): any {
        const map = {
            "0": "系统管理员",
            "1": "项目负责人",
            "2": "样本录入人",
            "3": "实验人员",
            "4": "分析人员",
            "5": "实验审核人员",
            "6": "分析审核人员",

        }
        return map[value];
    }
}