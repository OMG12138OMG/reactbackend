import axios from 'axios';

const baseURL = '/api'

//axios二次封装
class HttpRequest {
    //构造函数
    constructor(baseURL){
        this.baseURL = baseURL;
    }
    //配置
    getInsideConfig(){ 
        const config = {
            baseURL: this.baseURL,
            header:{}
        }
        return config;
    }

    //拦截器
    interception(instance){
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    //发送网络请求
    request(options){
        options = {...this.getInsideConfig(), ...options}
        //创建axios实例
        const instance = axios.create();
        //配置拦截器
        this.interception(instance);
        return instance(options)
    }
}

const httpRequestInstance = new HttpRequest(baseURL);

export default httpRequestInstance;