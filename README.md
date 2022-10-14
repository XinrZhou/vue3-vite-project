# Vue 3 + TypeScript + Vite + Pinia + Element-Plus

## 创建项目
```
npm create vite@latest my-vue-app --template vue-ts
```

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
* hash模式，解决生产环境刷新404问题
```
history:createWebHashHistory(),
```
5. vue-router4.x控制台报错："api.now is not a function"
* 解决：开发者工具升级到新版


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
 3. 生产环境：nginx解决跨域


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
 3. 持久化存储token、role（sessionStorage）
 4. 请求拦截器添加token
 ```
 if (token) config.headers['token'] = token 
 ```

 ### 获取用户信息  /info  GET

 ### 修改密码 /password/${pwd}  PUT
 判断用户密码是否为默认密码，若为默认密码，弹窗提示用户修改密码


## 管理员角色
### 身份校验  /admin/checkadmin  GET

### 重置密码 /admin/password/{number}  PUT  number为用户名
1. 用户需要输入两次密码，前端判断两次密码是否相同
2. 相同：发请求；不同，弹窗提示两次密码不匹配

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
2. 上传.xlsx文件，前端对数据处理后传给服务器


## 学生角色  
### 获取导师列表  /teachers  GET
1. 若服务器返回数据为空，则未到系统开放时间，不展示导师列表
2. 仓库中存储服务器返回的导师列表，TS报错"类型never上不存在属性"解决方案
```
teacherList:[] as any
```
3. 导师剩余名额需要经过计算
4. pinia数据更新但页面不重新渲染
* 异步操作加载顺序
* 解决方案：nextTick()

### 选导师  /teachers/{tid}  PUT
1. 获取表格当前行的数据：使用插槽
```
<template v-slot="scope">
    <el-button type="success" size="small" :disabled="scope.row.remaining=='0'?true:false"
        @click="confirmSelect(scope.row.id)">Confirm</el-button>
</template>
```
2. 判断当前导师的剩余名额是否为0，若为0，则禁用选择按钮
3. 学生未选导师，进度条为2；选中但未确认，进度条为3；成功选择，进度条状态变为4
4. 控制台修改提交按钮禁用状态，页面渲染结果与理想不符合，如何解决？
* 拦截器配置正确（前提）
* 将调用api的语句放在try-catch中
* 重新拉取导师列表，获取最新数据


## 教师角色  
### 查看未选择学生  /teacher/unselected  GET
1. 服务器返回数据为数组，需要处理后才能展示在页面上
2. 展示学生名单，for循环

### 查看个人学生  /teacher/students  GET

### 全部学生导师  /teacher/allstudents  GET
1. 导表格时，需要对数据进行处理
2. 进度条组件，选导师完成率需要经过计算


## 其他问题
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
1. 如何处理页面渲染和数据请求之间的关系
2. vue3中setup相当于生命周期函数，替代了beforeCreate 、created这两个钩子
3. vue3.2父子组件通信——子组件
```
import { defineProps } from 'vue'
const props = defineProps(['value'])
```
4. 管理员角色上传文件
* 封装Upload组件，使用组件自定义事件
* 处理后的数据有些是Proxy对象，需要toRaw()再进行后续操作
5. UI设计应简约
6. 使用接口、常量等，避免硬编码