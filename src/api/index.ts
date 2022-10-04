import {request} from '@/api/http'
import axios from 'axios'
 
// 登录
export function reqGetLogin(data:any) {
    return request({
      url: '/login',
      data,
      method:'post',
    })
}

//修改密码
export function reqChangePwd(pwd:string) {
  return request({
    url:`/password/${pwd}`,
    method:'put'
  })
}

//获取信息
export function reqGetInfo(){
  return request({
    url:'/info',
    method:'get'
  })
}

//管理员鉴权
export function reqCheckAdmin(){
  return request({
    url:'/admin/checkadmin',
    method:'get'
  })
}

//重置用户密码
export function reqResetPwd(number:string){
  return request({
    url:`/admin/password/${number}`,
    method:'put'
  })
}

//重置系统开放时间
export function reqResetDate(time:string){
  return request({
    url:`/admin/starttime/${time}`,
    method:'put'
  })
}

//添加导师
export function reqAddTeachers(data:any){
  return request({
    url:'/admin/teachers',
    data,
    method:'post'
  })
}

//添加学生列表
export function reqAddStudents(data:any){
  return request({
    url:'/admin/students',
    data,
    method:'post'
  })
}

//获取导师列表
export function reqGetTeacherList() {
  return request({
    url:'/teachers',
    method:'get'
  })
}

//选择导师
export function reqSelectTutor(tid:number){
  return request({
    url:`/teachers/${tid}`,
    method:'put'
  })
}

//未选学生名单
export function reqGetUnSelectedStudent(){
  return request({
    url:'/teacher/unselected',
    method:'get'
  })
}

//该导师学生名单
export function reqGetStudent(){
  return request({
    url:'/teacher/students',
    method:'get'
  })
}

//所有学生指导教师
export function reqGetAllStudent(){
  return request({
    url:'/teacher/allstudents',
    method:'get'
  })
}