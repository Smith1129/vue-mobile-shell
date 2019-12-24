import { getToken, setToken, removeToken } from '@/utils/auth'
import userHttp from '@/api/login'
import router from '../../router'
const user = {
    state: {
        userToken : getToken('ttz_token'),
        userInfo:'',
        passPayload:'',
        routerInfo:{},
        verifyPicInfo:'',
        errorMsg:'',
        loadingStatus:false,
        errorMsg_phone:'',
        loadingStatus_phone:''
        // verifyPicInfo:{}
    },
    mutations: {
        SET_TOKEN: (state, payload) => {
            state.userToken = payload
        },
        SET_INFO: (state,payload) =>{
            state.userInfo = payload
        },
        setPassInfo(state,payload){
            console.log(222)
            state.passPayload = payload
        },
        setRouterInfo(state,payload){
            state.routerInfo = payload
        },
        setVerifyPicInfo(state,payload){
            state.verifyPicInfo = payload
        },
        setLoginError(state,payload){
            state.errorMsg = payload 
        },
        setErrorMsg_phone(state,payload){
            state.errorMsg_phone = payload
        },
        setLoadingStatus(state,payload){
            state.loadingStatus = payload
        },
        setLoadingStatus_phone(state,payload){
            state.loadingStatus_phone = payload
        }
    },
    actions: {
        getLogin({commit},payload){
            userHttp.loginInfo(payload).then((res)=>{
                if(res.Code === 200){
                    commit('SET_TOKEN',res.Data.Token)
                    setToken('ttz_token',res.Data.Token)
                    this.dispatch('user/getInfo')
                    console.log(this.state.user.routerInfo.fullPath)
                    if(this.state.user.routerInfo.fullPath){
                        router.push(this.state.user.routerInfo.fullPath)
                    }
                    commit('setLoginError','')
                }else{
                    commit('setLoginError',res.Msg)
                }
                commit('setLoadingStatus',false)
            })
        },
        getPhoneLogin({commit},payload){
            userHttp.get_PhoneLogin(payload).then((res)=>{
                if(res.Code === 200){
                    commit('SET_TOKEN',res.Data.Token)
                    setToken('ttz_token',res.Data.Token)
                    this.dispatch('user/getInfo')
                    console.log(this.state.user.routerInfo.fullPath)
                    if(this.state.user.routerInfo.fullPath){
                        router.push(this.state.user.routerInfo.fullPath)
                    }
                    commit('setErrorMsg_phone','')
                }else{
                    commit('setErrorMsg_phone',res.Msg)
                }
                commit('setLoadingStatus_phone',false)
            })
        },
        getInfo({commit},payload){
            userHttp.userInfo(payload).then((res)=>{
                if(res.Code === 200){
                    commit('SET_INFO',res.Data)
                    if(res.Data.FinancePwdCon==0){
                        removeToken('ttz_freeca')
                    }
                    const ttzhmd = getToken('ttz_hmd')
                    if(ttzhmd){
                        if(ttzhmd != String(res.Data.IsRefuse)){
                            console.log(ttzhmd,String(res.Data.IsRefuse),'111a')
                            setToken('ttz_hmd',res.Data.IsRefuse)
                        }else {
                            return false
                        }
                    }else {
                        setToken('ttz_hmd',res.Data.IsRefuse)
                    }
                }else if(res.Code===600){
                    removeToken('ttz_token')
                }
            })
        },
        getVerifyPic({commit},payload){
            userHttp.getVerifyPic(payload).then((res)=>{
                if(res.Code == 200)
                {
                    commit('setVerifyPicInfo',res.Data)
                    if(payload.success){
                        payload.success(res.Data.key)
                    }
                }
            })
        },
        VerifySuccess({commit},payload){
            
        }
        // getPass({commit},payload){
            
        // }
    
    },
    namespaced: true
}
export  default user