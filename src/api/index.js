import http from './axios';

// 获取数据的接口
export const getData = () => {
    return http.request({
        url: '/home/getData',
        method: 'get',
    })
}

//新增用户
export const createUser = (data) => {
    return http.request({
        url: '/user/createUser',
        method: 'post',
        data
    })
}
//查询用户
export const getUserList = (params) => {
    return http.request({
        url: '/user/getUserList',
        method: 'get',
        params
    })
}
//修改用户
export const updateUser = (data) => {
    return http.request({
        url: '/user/updateUser',
        method: 'put',
        data
    })
}
//删除用户
export const deleteUser = (data) => {
    return http.request({
        url: '/user/deleteUser',
        method: 'delete',
        data
    })
}

export const getMenu = (data) => {
    return http.request({
        url: '/permission/getMenu',
        method: 'post',
        data
    })
}
