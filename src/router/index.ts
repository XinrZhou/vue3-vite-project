import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import * as consty from '@/types/Const'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'login',
            path: '/login',
            component: () => import('@/views/Login.vue'),
        },
        {
            path: '/',
            component: () => import('@/views/Main.vue'),
            meta: {
                role: consty.STUDENT 
            },
            children: [
                {
                    name: 'admin',
                    path: 'admin',
                    component: () => import('@/views/admin/Admin.vue'),
                    meta: {
                        role: consty.ADMIN 
                    }
                },
                {
                    name: 'student',
                    path: 'student',
                    component: () => import('@/views/student/Student.vue'),
                    meta: {
                        role: consty.STUDENT 
                    }
                },
                {
                    name: 'teacher',
                    path: 'teacher',
                    component: () => import('@/views/teacher/Teacher.vue'),
                    meta: {
                        role: consty.TEACHER 
                    }
                },
            ]
        },
        {
            path: '/:pathMatch(.*)',
            redirect: '/login',
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
    } else {
        sessionStorage.clear()
        router.push('/login')
    }
})

export default router