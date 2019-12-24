import base from './base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const forgeHttp = {
    // 锻造记录    
    forgeLog(params) {
        return axios.get(`${base.apiNewPerson}/forgeLog`, { params: params });
    },
    //锻造按钮
    freecaForgeBatch(params) {
        return axios.get(`${base.apiNewPerson}/freecaForgeBatch`, { params: params });
    },
    //抽奖按钮
    forgeGetCard(params) {
        return axios.get(`${base.apiNewPerson}/forgeFreeca`, { params: params });
    }
    // 其他接口…………
}

export default forgeHttp