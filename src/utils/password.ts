//存储密码
export let setPassword = (password:string)=>{
    localStorage.setItem('PASSWORD',password)
}

//获取密码
export let getPassword = ()=>{
    return localStorage.getItem('PASSWORD')||''
}


