// console.log("before")
function checkTWID(id){
    //1. 長度 == 10
    //2. 1 = a~z
    //3. 2 = 1 or 2
    //4. 3-10 = 0~9
    //5. 檢查碼
    // console.log("start checkid()")
    let ret = false;
    let letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
    if(id.match(/^[A-Z][12][0-9]{8}$/)){ //[0-9]{8}前面的正規表示出現8次
       let c1 = id.charAt(0);
       let n12 = letters.indexOf(c1) + 10; //E -> 4 -> 14
       let n1 = Math.floor(n12 / 10); //1
       let n2 = n12 % 10; //4
       let n3 = parseInt(id.substr(1,1)); 
       let n4 = parseInt(id.substr(2,1)); 
       let n5 = parseInt(id.substr(3,1)); 
       let n6 = parseInt(id.substr(4,1)); 
       let n7 = parseInt(id.substr(5,1)); 
       let n8 = parseInt(id.substr(6,1)); 
       let n9 = parseInt(id.substr(7,1)); 
       let n10 = parseInt(id.substr(8,1)); 
       let n11 = parseInt(id.substr(9,1));
       let sum = n1*1 + n2*9 + n3*8 + n4*7 + n5*6 + n6*5 + n7*4 +
       n8*3 + n9*2 + n10*1 + n11*1;
       ret = sum % 10 == 0;
    }
    // console.log("end checkid()");
    return ret;
}
// console.log("after")

function creatTWid(){
    let gender = Math.floor(Math.random()*2) == 0;
    return creatTWidByGender(gender);
}
function creatTWidByArea(area){
    // let gender = Math.floor(Math.random()*2+1);
    let gender = Math.floor(Math.random()*2) == 0;
    return creatTWidByBoth(area ,gender);
}
function creatTWidByGender(gender){
    let letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
    let rand = Math.floor(Math.random()*26); //0 - 25
    let area = letters.substr(rand,1);
    return creatTWidByBoth(area ,gender);
}
//area = A - Z
//gender = true(1) / false(2)
function creatTWidByBoth(area = 'A',gender = false){
    let id  = area;
    id += gender?"1":"2";
    for(let i=0;i<7;i++){ //因為要產生其他7碼亂數
        id += Math.floor(Math.random()*10); 
    }
    for(let j = 0;j<10;j++){
        if(checkTWID(id + j)){
            //ok
            id += j;
            break;
        }
    }
    return id;
}

//clone object else => null;
function clone(source){
    if(source === null || typeof(source) !== "object") return null;
    
    let target = new Object();
    for(let prop in source){
        if(typeof(source[prop])=== "object") {
            target[prop] = clone(source[prop]); //如果為物件即再次尋訪物件下的東西
        }else{
            target[prop] = source[prop];
        }
    }

    return target;
}

Date.prototype.getTWYear = function(){ //在擴充date
    return this.getFullYear()-1911;
}
Date.prototype.getCWeek = function(){ //本來沒有給他擴充
    // switch(day){
    //     case 0: day = "monday";break;
    //     case 1: day = "tuseday";break;
    //     case 2: day =  "wednesday";break;
    //     case 3: day =  "thursday";break;
    //     case 4: day =  "friday";break;
    //     case 5: day = "saturday";break;
    //     case 6: day =  "sunday";break;
    // }
    let w = this.getDay(); // 0 - 6
    let cw = ['週日','週一','週二','週三','週四','週五','週六'];
    return cw[w];
}