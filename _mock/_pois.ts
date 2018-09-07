export const POIS = {
    '/pois': {
        total: 2,
        list: [
            {
                id: 10000,
                user_id: 1,
                name: '测试品牌',
                branch_name: '测试分店',
                geo: 310105,
                country: '中国',
                province: '上海',
                city: '上海市',
                district: '长宁区',
                address: '中山公园',
                tel: '15900000000',
                categories: '美食,粤菜,湛江菜',
                lng: 121.41707989151003,
                lat: 31.218656214644792,
                recommend: '推荐品',
                special: '特色服务',
                introduction: '商户简介',
                open_time: '营业时间',
                avg_price: 260,
                reason: null,
                status: 1,
                status_str: '待审核',
                status_wx: 1,
                modified: 1505826527288,
                created: 1505826527288,
            },
            {
                id: 10001,
                user_id: 2,
                name: '测试品牌2',
                branch_name: '测试分店2',
                geo: 310105,
                country: '中国',
                province: '上海',
                city: '上海市',
                district: '长宁区',
                address: '中山公园',
                tel: '15900000000',
                categories: '美食,粤菜,湛江菜',
                lng: 121.41707989151003,
                lat: 31.218656214644792,
                recommend: '推荐品',
                special: '特色服务',
                introduction: '商户简介',
                open_time: '营业时间',
                avg_price: 260,
                reason: null,
                status: 1,
                status_str: '待审核',
                status_wx: 1,
                modified: 1505826527288,
                created: 1505826527288,
            },
        ],
    },
    '/list': {
        total: 5,
        data: [
            {
                name: '张三',
                sex: '男',
                hist: '无锡人民医院',
                id: '001',
                code: '001',
                type: '血样',
                position: '江苏',
                time: 1526608842000,
            },
            {
                name: '张三',
                sex: '男',
                hist: '无锡人民医院',
                id: '001',
                code: '001',
                type: '血样',
                position: '江苏',
                time: 1526608842000,
            },
            {
                name: '张三',
                sex: '男',
                hist: '无锡人民医院',
                id: '001',
                code: '001',
                type: '血样',
                position: '江苏',
                time: 1526608842000,
            },
            {
                name: '张三',
                sex: '男',
                hist: '无锡人民医院',
                id: '001',
                code: '001',
                type: '血样',
                position: '江苏',
                time: 1526608842000,
            },
            {
                name: '张三',
                sex: '男',
                hist: '无锡人民医院',
                id: '001',
                code: '001',
                type: '血样',
                position: '江苏',
                time: 1526608842000,
            }
        ]
    },

    '/task': {
        total: 5,
        data: [
            {
                id: '001',
                name: '实验一',
                type: '抽提',
                condition: '未处理',
                create_time: 1526608842000,
                start_time: 1526608842000,
                end_time: 1526608842000,
                pro_name: '项目一',
                time: 1526608842000,
            },
            {
                id: '002',
                name: '实验二',
                type: '抽提',
                condition: '已完成',
                create_time: 1526608842000,
                start_time: 1526608842000,
                end_time: 1526608842000,
                pro_name: '项目二',
                time: 1526608842000,
            },
            {
                id: '003',
                name: '实验三',
                type: '建库',
                condition: '已完成',
                create_time: 1526608842000,
                start_time: 1526608842000,
                end_time: 1526608842000,
                pro_name: '项目三',
                time: 1526608842000,
            },
            {
                id: '004',
                name: '实验四',
                type: '建库',
                condition: '未处理',
                create_time: 1526608842000,
                start_time: 1526608842000,
                end_time: 1526608842000,
                pro_name: '项目四',
                time: 1526608842000,
            },
            {
                id: '005',
                name: '实验五',
                type: '测序',
                condition: '未处理',
                create_time: 1526608842000,
                start_time: 1526608842000,
                end_time: 1526608842000,
                pro_name: '项目五',
                time: 1526608842000,
            },
        ]
    },

    '/file': {
        total: 5,
        data: [
            {
                name:"文件1",
                file:"预览文件",
                size:"1M",
                create_time: 1526608842000,
                create_name:"张三",
                vision:"可视化文件"
            },
            {
                name:"文件2",
                file:"预览文件",
                size:"1M",
                create_time: 1526608842000,
                create_name:"张三",
                vision:"可视化文件"
            },
            {
                name:"文件3",
                file:"预览文件",
                size:"1M",
                create_time: 1526608842000,
                create_name:"张三",
                vision:"可视化文件"
            },
            {
                name:"文件4",
                file:"预览文件",
                size:"1M",
                create_time: 1526608842000,
                create_name:"张三",
                vision:"可视化文件"
            },
            {
                name:"文件5",
                file:"预览文件",
                size:"1M",
                create_time: 1526608842000,
                create_name:"张三",
                vision:"可视化文件"
            },
        ]
    },
    '/detection': {
        data: [
            {
                vaule:"1",
                label:"肺癌用药指导基因检测（组织）"
            },
            {
                vaule:"2",
                label:"结直肠癌用药指导基因检测（组织）"
            },
            {
                vaule:"3",
                label:"乳腺癌／卵巢癌/宫颈癌用药指导基因检测（组织）"
            },
            {
                vaule:"4",
                label:"胃癌／食管癌用药指导基因检测（组织）"
            },
            {
                vaule:"5",
                label:"综合癌种个体化用药指导基因检测－基础版（组织）"
            },
            {
                vaule:"6",
                label:"肾癌／膀胱癌／前列腺癌用药指导基因检测（组织）"
            },
            {
                vaule:"7",
                label:"肾癌／膀胱癌／前列腺癌用药指导基因检测（组织+EDTA抗凝血）"
            },
            {
                vaule:"8",
                label:"肺癌用药指导基因检测（组织+EDTA抗凝血）"
            },
            {
                vaule:"9",
                label:"结直肠癌用药指导基因检测（组织+EDTA抗凝血）"
            },
            {
                vaule:"10",
                label:"乳腺癌／卵巢癌/宫颈癌用药指导基因检测（组织+EDTA抗凝血）"
            },
            {
                vaule:"11",
                label:"胃癌／食管癌用药指导基因检测（组织+EDTA抗凝血）"
            },
            {
                vaule:"12",
                label:"综合癌种用药指导基因检测－基础版（组织+EDTA抗凝血）"
            },
            {
                vaule:"13",
                label:"肝癌用药指导基因检测（组织）"
            },
            {
                vaule:"14",
                label:"肝癌用药指导基因检测（组织+EDTA抗凝血）"
            },
            {
                vaule:"15",
                label:"综合遗传疾病诊断与携带者排查（4000种）"
            },
            {
                vaule:"16",
                label:"肺癌用药指导基因检测（血液-ctDNA）"
            },
            {
                vaule:"17",
                label:"结直肠癌用药指导基因检测（血液-ctDNA）"
            },
            {
                vaule:"18",
                label:"乳腺癌／卵巢癌/宫颈癌用药指导基因检测（血液-ctDNA）"
            },
            {
                vaule:"19",
                label:"胃癌／食管癌用药指导基因检测（血液）"
            },
            {
                vaule:"20",
                label:"综合癌种个体化用药指导基因检测－基础版（血液）"
            },
            {
                vaule:"21",
                label:"肾癌／膀胱癌／前列腺癌用药指导基因检测（血液-ctDNA）"
            },
            {
                vaule:"22",
                label:"肝癌用药指导基因检测（血浆-ctDNA）"
            },
            {
                vaule:"23",
                label:"肾癌CTDNA"
            },
            {
                vaule:"24",
                label:"综合用药指导疗效监控--单癌种复检患者（血液）"
            },
            {
                vaule:"25",
                label:"综合用药指导疗效监控--综合癌种复检患者（血液）"
            },
            {
                vaule:"26",
                label:"乳腺/卵巢癌遗传性检测"
            },
            {
                vaule:"27",
                label:"遗传性胃癌筛查"
            },
            {
                vaule:"28",
                label:"遗传性甲状腺癌筛查"
            },
            {
                vaule:"29",
                label:"遗传性黑色素瘤筛查"
            },
            {
                vaule:"30",
                label:"遗传性肾癌筛查"
            },
            {
                vaule:"31",
                label:"遗传性视网膜母细胞瘤筛查"
            },
            {
                vaule:"32",
                label:"遗传性结直肠癌筛查"
            },
            {
                vaule:"33",
                label:"遗传性前列腺癌筛查"
            },
            {
                vaule:"34",
                label:"遗传性子宫内膜癌筛查"
            },
            {
                vaule:"35",
                label:"遗传性胰腺癌筛查"
            },
            {
                vaule:"36",
                label:"遗传性垂体瘤筛查"
            },
            {
                vaule:"37",
                label:"遗传肿瘤综合筛查"
            },
            {
                vaule:"38",
                label:"遗传性肿瘤患者家属基因验证检测"
            }
        ]
    },
    '/sampleField': {
        data: [
            {
                vaule:"1",
                label:"全血",
                type:'B',
                enName:'blood'
            },
            {
                vaule:"2",
                label:"骨髓",
                type:'M',
                enName:'bone marrow'
            },
            {
                vaule:"3",
                label:"组织",
                type:'T',
                enName:'tissue'
            },
            {
                vaule:"4",
                label:"中间产物",
                type:'I',
                enName:' intermediate product'
            },
            {
                vaule:"5",
                label:"毛发",
                type:'x',
                enName:'x'
            },
            {
                vaule:"6",
                label:"脑脊液",
                type:'x',
                enName:'x'
            },
            {
                vaule:"7",
                label:"唾液",
                type:'x',
                enName:'x'
            },
            {
                vaule:"8",
                label:"口腔拭子",
                type:'x',
                enName:'x'
            },
            {
                vaule:"9",
                label:"鼻咽拭",
                type:'x',
                enName:'x'
            },
            {
                vaule:"10",
                label:"痰液",
                type:'x',
                enName:'x'
            },
            {
                vaule:"11",
                label:"呼吸道灌洗液",
                type:'x',
                enName:'x'
            },
            {
                vaule:"12",
                label:"乳汁",
                type:'x',
                enName:'x'
            },
            {
                vaule:"13",
                label:"胸腹水",
                type:'x',
                enName:'x'
            },
            {
                vaule:"14",
                label:"胃液",
                type:'x',
                enName:'x'
            },
            {
                vaule:"15",
                label:"胆汁",
                type:'x',
                enName:'x'
            },
            {
                vaule:"16",
                label:"培养物",
                type:'x',
                enName:'x'
            },
            {
                vaule:"17",
                label:"病灶分泌物（脓液、疱疹液、溃疡液）",
                type:'x',
                enName:'x'
            },
            {
                vaule:"18",
                label:"尿液",
                type:'x',
                enName:'x'
            },
            {
                vaule:"19",
                label:"尿滤片",
                type:'x',
                enName:'x'
            },
            {
                vaule:"20",
                label:"粪便",
                type:'x',
                enName:'x'
            },
            {
                vaule:"21",
                label:"生殖道分泌物（涂片、细胞、宫颈分泌物）",
                type:'x',
                enName:'x'
            },
            {
                vaule:"22",
                label:"羊水",
                type:'x',
                enName:'x'
            },
            {
                vaule:"23",
                label:"皮肤表面拭子/伤口拭子",
                type:'x',
                enName:'x'
            },
            {
                vaule:"24",
                label:"指甲",
                type:'x',
                enName:'x'
            },
            {
                vaule:"25",
                label:"皮屑",
                type:'x',
                enName:'x'
            },
            {
                vaule:"26",
                label:"其他",
                type:'x',
                enName:'x'
            }
        ]
    }

};
