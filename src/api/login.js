import base from './base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const userHttp = {
    // 登陆   
    loginInfo(params) {
        return axios.get(`${base.apiNew}/login`, { params: params });
    },
    //用户信息
    userInfo(params) {
        return axios.get(`${base.apiNew}/userInfo`, { params: params });
    },
    //获取验证码
    getCode(params){
        return axios.get(`${base.ApiNew}/getVerify`, { params: params });
    },
    //手机号登录
    get_PhoneLogin(params){
        return axios.get(`${base.apiNew}/H5login`, { params: params });
    },
    //找回密码
    getPass(params){
        return axios.get(`${base.ApiNew}/forgetPassword`, { params: params });
    },
    //获取拼图验证图
    getVerifyPic(params){
        return axios.get(`${base.apiVerify}/captcha/pictures`, { params: params })
    },
    //拼图验证
    getVerify(params){
        return axios.get(`${base.apiVerify}/captcha/validate`, { params: params })
    }
    
    // 其他接口…………
}

export default userHttp