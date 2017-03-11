// 监听对象的改变
function Observer(obj){
    this.data=obj;
    this.walk(obj);
    //用来存放回调
    this.tmp={};
}

Observer.prototype = {
    walk: function (obj) {
        var val;
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                val = obj[key];
                if(typeof val==='object'){
                    this.walk(val);
                }
                this.convert(key,val,obj);
            }
        }
    },
    convert :function (key, val, obj) {
        var _this = this;
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get:function () {
                console.log('你访问了' + key);
                return val
            },
            set: function (newVal) {
                console.log('你设置了' + key);
                console.log('新的' + key + ' = ' + newVal)
                if(newVal === val) return;

                //设置的新属性为对象时调用观察者
                if(typeof newVal === 'object'){
                    _this.walk(newVal);
                }
                //交换结点值，并将旧结点值作为查询对象
                var pre = val;
                val = newVal;
                //触发事件
                _this.eventOn(key,pre,newVal,obj);
            }
        })
    },
    eventOn: function(key,pre,newVal,obj){
        var rootPre;
        //key是嵌套属性
        if(obj != this.data){
            for(var val in this.data){
                if(obj === this.data[val]){
                    rootPre = val;
                    break;
                }
                else{
                    rootPre=this.getRootObj(this.data[val],obj,val);
                    if(rootPre) break;
                }
            }
        }
        else{
            rootPre = key;
        }
        if(this.tmp[rootPre]){
            this.tmp[rootPre].forEach(function(sub){
                sub(pre,newVal);
            })
        }
    },
    //遍历找出obj的根属性
    getRootObj: function(rootObj,obj,rootProp){
        var objSon;
        for(var val in rootObj){
            objSon = rootObj[val];
            if(objSon === obj){
                break;
            }else if(typeof objSon==='object'){
                /*console.log("之前是"+prop+"继续遍历"+rootProp);*/
                return this.getRootObj(objSon,obj,rootProp);
            }
        }
        return rootProp;
    },
    $watch: function(key,callback){
        if(!this.tmp[key]){
            this.tmp[key] = [];
        }
        this.tmp[key].push(callback);
    }
}

var app = new Observer({
    basicInfo: {
        fullname: {
          firstname: 'jinhui',
            lastname:'wei'
        },
        age: 23
    },
    name: 'AK4TRL',
    address: 'zhongshan'
})

app.$watch('basicInfo',function(oldVal,newVal){
    console.log('我的basicInfo属性变了，可能是姓名，可能是年龄，变为了'+newVal);
});