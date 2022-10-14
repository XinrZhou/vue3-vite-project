import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

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
                role: 'Yo87M'
            },
            children: [
                {
                    name: 'admin',
                    path: 'admin',
                    component: () => import('@/views/admin/Admin.vue'),
                    meta: {
                        role: 'ppYMg'
                    }
                },
                {
                    name: 'student',
                    path: 'student',
                    component: () => import('@/views/student/Student.vue'),
                    meta: {
                        role: 'Yo87M'
                    }
                },
                {
                    name: 'teacher',
                    path: 'teacher',
                    component: () => import('@/views/teacher/Teacher.vue'),
                    meta: {
                        role: 'nU0vt'
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