import Mock from 'mockjs'
import  getStatisticalData from './mockServeData/home'
import  getMenu  from './mockServeData/permission'
import  userApi  from './mockServeData/user'

Mock.mock(/home\/getData/, 'get', getStatisticalData)
Mock.mock(/permission\/getMenu/, 'post', getMenu)
Mock.mock(/user\/createUser/, 'post', userApi.createUser)
Mock.mock(/user\/getUserList/, 'get', userApi.getUserList)
Mock.mock(/user\/updateUser/, 'put', userApi.updateUser)
Mock.mock(/user\/deleteUser/, 'delete', userApi.deleteUser)