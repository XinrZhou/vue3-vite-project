//存储id
export let setUid = (uid:string)=>{
    localStorage.setItem('UID',uid)
}

//获取id
export let getUid = ()=>{
    return localStorage.getItem('UID')||''
}


