let isExist=true;
let count=0;
function USER(){
    this.username=null,
    this.password=null,
    this.data={}
}

//所有用户
let users={
    data:[
    {
        username:'lisi',
        password:'11111111',
        count:0,
        data:{}
    }
]};
let nameData = JSON.stringify(users);
// localStorage.setItem('malluser', nameData);//初始化
//本地存储
if(localStorage.malluser){
    let getData=localStorage.getItem("malluser");
    users=JSON.parse(getData);
    console.log("获取本地存储成功");
} else {
    localStorage.setItem('malluser', users);
}
//登录验证

const checkuser=function (p){
    for(let i=0;i<users.data.length;i++){
        let username=users.data[i].username;
        let pusername=p.username;
        if(username === pusername){
            isExist = false;
            return isExist;
        }
    };
    return isExist;
};

//注册

const Registration=function (reguser){
    const user=new USER();
    checkuser(reguser)
    if(checkuser(reguser)){
        Object.keys(user).forEach(function(key){
            user[key]=reguser[key];
            // localStorage.setItem('tokin',reguser[username]);
        });
        users.data.push(user);
        let newNameData = JSON.stringify(users);
        localStorage.setItem('malluser', newNameData);
    };
    isExist=true;
}
console.log(users)

export  {Registration,checkuser}