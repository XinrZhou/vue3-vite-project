import { defineStore } from "pinia"
import { User } from '@/types/type'
import { reqGetLogin, reqGetTeacherList, reqChangePwd, reqGetInfo, reqCheckAdmin } from "@/api";
import { ElMessage, ElMessageBox } from "element-plus";
import router from '@/router'

export const userInfoStore = defineStore('userInfo', {
    state: () => {
        return {
            user: {} as User,
            startTime: '',
            showResetPassword: false,
        }
    },
    actions: {
        //登录
        async goLogin(data: User) {
            try {
                let result: any = await reqGetLogin(data)
                sessionStorage.setItem('TOKEN', result.headers.token)
                sessionStorage.setItem('ROLE', result.headers.role)
                switch (result.headers.role) {
                    case 'ppYMg':
                        router.push('/admin')
                        break;
                    case 'Yo87M':
                        router.push('/student')
                        break;
                    case 'nU0vt':
                        router.push('/teacher')
                        break;
                }
            } catch (error: any) {
                this.showResetPassword = false
                ElMessage.error(error.message)
                return Promise.reject(new Error(error.message))
            }
        },

        //修改密码
        async changePwd(pwd: string) {
            try {
                let result: any = await reqChangePwd(pwd)
                ElMessageBox.alert(`新密码：${pwd}`, 'Success!', {
                    confirmButtonText: 'OK',
                    callback: (action: any) => {
                        ElMessage({
                            type: 'success',
                            message: `新密码 ${pwd}`,
                        })
                    },
                })
                this.showResetPassword = false
            } catch (error: any) {
                ElMessage.error(error.message)
            }
        },

        //获取用户信息
        async getInfo() {
            try {
                let result: any = await reqGetInfo()
                this.user = result.data.data.user
                this.startTime = result.data.data.starttime
            } catch (error: any) {
                ElMessage.error(error.message)
                return Promise.reject(new Error(error.message))
            }
        },

        //退出登录
        goLogout() {
            sessionStorage.clear()
            location.reload()
        }
    }
})
