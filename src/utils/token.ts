//存储token
export let setToken = (token:string)=>{
    localStorage.setItem('TOKEN',token)
}

//获取token
export let getToken = ()=>{
    return localStorage.getItem('TOKEN')||''
}


