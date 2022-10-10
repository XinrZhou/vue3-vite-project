# Vue 3 + TypeScript + Vite + Pinia + Element-Plus

## 路由
1. 重定向
```
{
    path:'/:pathMatch(.*)',
    redirect:'/home'
}
```
2. 引入组件
```
component:()=>import('@/views/Login.vue')
```
3. useRoute()返回一个Proxy对象,若想获得当前路由信息，需要使用toRaw()
```
const route = toRaw(useRoute())
```
4. 全局前置路由守卫
* 路由元信息基于角色判断用户身份，进行路由跳转
* 若非法访问（地址栏非法输入），则跳转至登录页
```
history:createWebHashHistory(),
```

## ajax请求
1. 接口地址：http://122.9.33.79:8855/api/
2. 解决跨域（开发环境）
* Vue.config.js
```
server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://122.9.33.79:8855/api',	
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
```
* /src/api/index.ts
```
 axios.defaults.baseURL = '/api'
 ```

 ## 所有角色
 ### 登录 /login  POST
 1. 参数
 ```
 User{
    number:string,
    password:string
}
 ```
 2. 返回的headers中有token和role('Yo87M':学生，'nU0vt':教师，'ppYMg':管理员)
 3. 持久化存储token、role
 4. 请求拦截器添加token
 ```
 if (token) config.headers['token'] = token 
 ```
 ## 获取用户信息  /info  GET
 ## 修改密码 /password/${pwd}  PUT
 判断用户密码是否为默认密码，若为默认密码，弹窗提示用户修改密码
```
if (User.password == User.number )

```

## 管理员角色
### 身份校验  /admin/checkadmin  GET
### 重置密码 /admin/password/{number}  PUT  number为用户名
### 重置开始时间  /admin/starttime/{time}  PUT
1. 获取时间选择器中的数据，进行格式转换后传给服务器
```
value-format="YYYY-MM-DDTHH:mm:ss"
```
2. 父子组件通信：自定义事件
* 父组件
```
<DateTimePicker @DateTime="getDateTime"/>
```
```
let getDateTime = (value:string)=>{
      console.log(value)
    }
```
* 子组件
```
const emits = defineEmits(['DateTime'])
  watch(value2,()=>{
    emits('DateTime',value2.value)
  })
```
### 添加导师  /admin/teachers  POST
### 添加学生  /admin/students  POST
1. 自定义事件 
2. 上传.xlsx文件并对数据进行处理

## 学生角色  
### 获取导师列表  /teachers  GET
1. 若服务器返回数据为空，则未到系统开放时间，不展示导师列表
2. 仓库中存储服务器返回的导师列表，TS报错"类型never上不存在属性"解决方案
```
teacherList:[] as any
```
3. 导师剩余名额计算后展示在页面
4. pinia数据更新但页面不重新渲染
* 异步操作加载顺序
* 解决方案：nextTick
```
nextTick(async() => {
    await getTeacherList()
    isLoding.value = false
    tableData.value = toRaw(studentInfo.teacherList)
}) 
```
### 选导师  /teachers/{tid}  PUT
1. 获取表格当前行的数据：使用插槽
```
<template v-slot="scope">
    <el-button type="success" size="small" :disabled="scope.row.remaining=='0'?true:false"
        @click="confirmSelect(scope.row.id)">Confirm</el-button>
</template>
```
2. 判断当前导师的剩余名额是否为0，若为0，则禁用选择按钮
3. 学生未选导师，进度条为2；若成功选择，进度条状态变为4

## 教师角色  
### 查看未选择学生  /teacher/unselected  GET
### 查看个人学生  /teacher/students  GET
### 全部学生导师  /teacher/allstudents  GET
1. 导表格时，需要对数据进行处理才能正确生成xlsx表


### 部署：docker docker-compose
1. nginx代理，解决跨域问题
2. vite刷新后404，需要将路由改为hash模式(#)
```
history:createWebHashHistory()
```

### element-plus 
1. 使用图标库时需要单独安装
```
@element-plus/icons-vue
```
2. 按需引入
```
import { Clock,Edit,User} from '@element-plus/icons-vue'
```
3. 输入框不居中 
```
<div class="mt-4" style="text-align: -webkit-center">
    <el-input v-model="input3" placeholder="用户名" 
    </el-input>
</div>
```

### 处理后端返回时间 moment.js
1. 引入
```
import moment from "moment";
```
2. 使用
```
{{moment(userInfo.startTime).format("YYYY-MM-DD HH:mm:ss") }}
```
### 其他问题
1. 页面完成渲染时数据未获取完毕，数据更新后页面不再重新渲染
* v-show，先设为false
* 当所有请求数据回来之后，再将v-show变为true