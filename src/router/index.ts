import { createRouter,createWebHashHistory} from 'vue-router'
import { ElMessage  } from 'element-plus'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            name:'login',
            path:'/login',
            component:()=>import('@/views/Login.vue'),
        },
        {
            name:'admin',
            path:'/admin',
            component:()=>import('@/views/Admin.vue'),
            meta:{
                role:'ppYMg'
            }
        },
        {
            name:'student',
            path:'/student',
            component:()=>import('@/views/Student.vue'),
            meta:{
                role:'Yo87M'
            }
        },
        {
            name:'teacher',
            path:'/teacher',
            component:()=>import('@/views/Teacher.vue'),
            meta:{
                role:'nU0vt'
            }
        },
        //重定向，在项目运行之后
        {
            path:'/:pathMatch(.*)',
            redirect:'/login',
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.meta.role) {
      next()
      return
    }
  
    if (to.meta.role == sessionStorage.getItem('ROLE')) {
      next()
      return
    }else{
        sessionStorage.clear()
        router.push('/login')
    }
  })

export default router