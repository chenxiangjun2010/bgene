import { MockRequest } from '@delon/mock';
import * as _ from 'lodash';

const list = [];
const rawdatas = [];
const toolname = [
    { name: 'RawDataInput', inputFileSuffix: ['fq', 'gz'], outputFileSuffix: ['bam'] },
    { name: 'CNVkitCompare', inputFileSuffix: ['bam', 'fq', 'gz'], outputFileSuffix: ['zip'] },
    { name: 'PeakCallingCom', inputFileSuffix: ['zip'], outputFileSuffix: ['tar'] },
    { name: 'FreeBayes', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'GATK3', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'MISA', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'usearch', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'vcf2maf', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'GeneExpPlot', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'RawDataInput', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'FastQC', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'DnaSeqMap', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'SamToFastQ', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'ClusterPlot', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'GeneAnno', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'SamAndBPKM', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'DifGene', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'ReadsDisPlot', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'VolcanoPlot', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
    { name: 'testtool', inputFileSuffix: [], outputFileSuffix: [] },
];
const tooltype = [1, 2, 3, 4, 5, 6, 7];

for (let i = 0; i < 35; i += 1) {
    list.push({
        id: i,
        name: toolname[i].name,
        version: '1.0.0',
        type: tooltype[Math.floor(Math.random() * tooltype.length)],
        inputFile: i == 0 ? true : false,
        inputFileSuffix: toolname[i].inputFileSuffix,
        outputFileSuffix: toolname[i].outputFileSuffix,
    });
}

for (let i = 0; i < 3; i += 1) {
    rawdatas.push({
        id: i,
        name: '测试上传文件' + i + '.fg',
        url: '/home/huang/file/' + i,
        createdAt: new Date(),
    });
}

function getTools(params: any) {
    let ret = [...list];
    if (params != 0) {
        ret = ret.filter(data => data.type == params);
    }
    return ret;
}

function getRawDatas() {
    let ret = [...rawdatas];
    return ret;
}

function saveRawData(data) {
    rawdatas.unshift({
        id: data.id,
        name: data.name,
        url: data.url,
        createdAt: new Date(),
    });
}

function removeRawData(data) {
    const idx = list.findIndex(w => w.no === data.no);
    if (idx !== -1) list.splice(idx, 1);
    return true;
}

function check(data) {
    /* const sourcenode = _.find(list, { id: parseInt(data.sourcenode) });
    const targetnode = _.find(list, { id: parseInt(data.targetnode) });
    if (targetnode.inputFileSuffix.length == 0) {
        return true;
    } else {
        return _.intersection(sourcenode.outputFileSuffix, targetnode.inputFileSuffix).length == 0 ? false : true;
    } */
    return true;
}

function login(data) {
    let roles, msg, success;
    switch (data.username) {
        case "huangxiaomin0":
            //Admin
            if (data.password = "123123") {
                roles = ["0"];
                success = 1;
            } else {
                msg = "密码错误";
            }
            break;
        case "huangxiaomin1":
            //项目负责人
            if (data.password = "123123") {
                roles = ["1"];
                success = 1;
            } else {
                msg = "密码错误";
            }
            break;
        case "huangxiaomin2":
            //样本录入人
            if (data.password = "123123") {
                roles = ["2"];
                success = 1;
            } else {
                msg = "密码错误";
            }
            break;
        case "huangxiaomin3":
            //实验人员
            if (data.password = "123123") {
                roles = ["3"];
                success = 1;
            } else {
                msg = "密码错误";
            }
            break;
        case "huangxiaomin4":
            //分析人员
            if (data.password = "123123") {
                roles = ["4"];
                success = 1;
            } else {
                msg = "密码错误";
            }
            break;
        case "huangxiaomin5":
            //实验审核人员
            if (data.password = "123123") {
                roles = ["5"];
                success = 1;
            } else {
                msg = "密码错误";
            }
            break;
        case "huangxiaomin6":
            //分析审核人员
            if (data.password = "123123") {
                roles = ["6"];
                success = 1;
            } else {
                msg = "密码错误";
            }
            break;
        case "huangxiaomin7":
            //多个角色
            if (data.password = "123123") {
                roles = ["1", "2", "3", "4"];
                success = 1;
            } else {
                msg = "密码错误";
            }
            break;
        default:
            //输入错误
            success = 0;
            msg = "账号或密码错误";
            break;
    }
    return { token: "231234sdr2344esr343e34", roles: roles, msg: msg, success: success };
}

export const TOOLS = {
    'POST /tool': (req: MockRequest) => getTools(req.body.type),
    'POST /tool/check': (req: MockRequest) => check(req.body),
    '/tool/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
    '/rawdata': () => getRawDatas(),
    'POST /rawdata': (req: MockRequest) => saveRawData(req.body),
    'POST /login': (req: MockRequest) => login(req.body),
    'DELETE /rawdata': (req: MockRequest) => removeRawData(req.queryString),
};
