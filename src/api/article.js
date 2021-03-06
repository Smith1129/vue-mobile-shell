/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const articleHttp = {
    // 列表    
    articleList(params) {
        return axios.get(`${base.apiNew}/notice`, { params: params });
    },
    indexList(params) {
        return axios.get(`${base.ApiNewLuck}/indexList`, { params: params });
    },
    downloadInfo(params) {
        return axios.get(`${base.apiNewAppGame}/downloadInfo`, { params: params });
    }
    // 其他接口…………
}

export default articleHttp