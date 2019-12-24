import base from './base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const play28Http = {
    // 列表    
    indexList(params) {
        return axios.get(`${base.ApiNewLuck}/indexList`, { params: params });
    },
    //服务器时间
    systemTime(params) {
        return axios.get(`${base.ApiNewLuck}/systemTime`, { params: params });
    },
    // 当前28信息
    lotteryInfo(params) {
        return axios.get(`${base.ApiNewLuck}/lotteryInfo`, { params: params });
    },
    // 自定义模式
    model(params) {
        return axios.get(`${base.ApiNewLuck}/model`, { params: params });
    },
    // 编辑自定义模式
    updateRemark(params) {
        return axios.get(`${base.ApiNewLuck}/updateRemark`, { params: params })
    },
    // 获取自定义模式内容
    doingModel(params) {
        return axios.get(`${base.ApiNewLuck}/doingModel`, { params: params })
    },
    //  自动参与信息
    autoPlayIndex(params) {
        return axios.get(`${base.ApiNewLuck}/autoPlayIndex`, { params: params })
    },
    //  上期参与
    funcModel(params) {
        return axios.get(`${base.ApiNewLuck}/funcModel`, { params: params })
    },
    //  走势
    trend(params) {
        return axios.get(`${base.ApiNewLuck}/trend`, { params: params })
    },
    //参与接口
    modelIndex(params) {
        return axios.get(`${base.ApiNewLuck}/modelIndex`, { params: params })
    },
    //下注接口
    doingLottery(params) {
        return axios.get(`${base.ApiNewLuck}/doingLottery`, { params: params })
    },
    //开启自动投注
    doingAutoPlay(params) {
        return axios.get(`${base.ApiNewLuck}/doingAutoPlay`, { params: params })
    },
    // 获奖列表
    winList(params) {
        return axios.get(`${base.ApiNewLuck}/winList`, { params: params })
    },
    // 我的投注
    myList(params) {
        return axios.get(`${base.ApiNewLuck}/myList`, { params: params })
    },
    //我的投注详情
    detail(params) {
        return axios.get(`${base.ApiNewLuck}/detail`, { params: params })
    },
    //领取救济银猪
    getHelpBean(params) {
        return axios.get(`${base.ApiNewLuck}/getHelpBean`, { params: params })
    },
    //娱乐工资
    wages(params) {
        return axios.get(`${base.ApiNewLuck}/wages`, { params: params })
    },
    // 其他接口…………
}

export default play28Http