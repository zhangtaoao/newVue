let isExist=true;
let count=0;
function USER(){
    this.username=null,
    this.password=null,
    this.token=null,
    this.data={}
}

//所有用户
let users={
    data:[
    // {
    //     username:'lisi',
    //     password:'11111111',
    //     token:"8584515",
    //     count:0,
    //     data:{}
    // }
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
//是否重名
let lopassword=null;
const checkuser=function (p){
    for(let i=0;i<users.data.length;i++){
        let username=users.data[i].username;
        let pusername=p.username;
        if(username === pusername){//重名返回false
            isExist = false;
            lopassword=users.data[i].password;
            return isExist;
        }
    };
    return isExist;
};
//验证密码是否正确
const checkpass=function (user){
    if(!checkuser(user)&&user.password==lopassword){
        return true;
    }else{
        return false;
    }
}
//注册

const Registration=function (reguser){
    const user=new USER();
    checkuser(reguser)
    if(checkuser(reguser)){
        Object.keys(user).forEach(function(key){
            user[key]=reguser[key];
        });
        users.data.push(user);
        let newNameData = JSON.stringify(users);
        localStorage.setItem('malluser', newNameData);
        console.log(users)
    };
    isExist=true;
}
// console.log(users)

export  {Registration,checkuser,checkpass}