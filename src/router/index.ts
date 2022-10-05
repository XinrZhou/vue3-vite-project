import { createRouter,createWebHistory} from 'vue-router'
import { getToken } from '@/utils/token'
import { ElMessage  } from 'element-plus'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            name:'home',
            path:'/home',
            component:()=>import('@/views/Home.vue'),
        },
        {
            name:'selectcenter',
            path:'/selectcenter',
            component:()=>import('@/views/SelectCenter.vue'),
            children:[
                {
                    name:'admin',
                    path:'admin',
                    component:()=>import('@/views/Admin.vue'),
                    meta:{
                        isAuth:true
                    }
                },
                {
                    name:'student',
                    path:'student',
                    component:()=>import('@/views/Student.vue'),
                    meta:{
                        isAuth:true
                    }
                },
                {
                    name:'teacher',
                    path:'teacher',
                    component:()=>import('@/views/Teacher.vue'),
                    meta:{
                        isAuth:true
                    }
                }
            ]
        },
        {
            name:'usercenter',
            path:'/usercenter',
            component:()=>import('@/views/UserCenter.vue'),
            meta:{
                isAuth:true
            }
        },
        {
            name:'login',
            path:'/login',
            component:()=>import('@/views/Login.vue'),
        },
        //重定向，在项目运行之后，定向到首页
        {
            path:'/:pathMatch(.*)',
            redirect:'/home'
        }
    ]
})

//全局前置路由守卫
router.beforeEach((to,from,next)=>{
    if(to.meta.isAuth){
        if(getToken()){
            next()
        }else{
            ElMessage.error('您当前无权查看该页面,请先登录！')
            router.push('/login')
        }
    }else{
        next()
    }
})

export default router