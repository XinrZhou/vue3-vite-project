//存储角色信息
export let setRole = (role:string)=>{
    localStorage.setItem('ROLE',role)
}

//获取角色信息
export let getRole = ()=>{
    return localStorage.getItem('ROLE')||''
}


