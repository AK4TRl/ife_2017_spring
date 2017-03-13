"use strict"
/// / 监听对象的改变
function Vue(obj){
    //View connection
    if (!(obj.el)) {
        throw "没有绑定元素";
        return;
    }
    var doms = document.getElementById(obj.el.substr(1)).getElementsByTagName('p');
    var reg = /\{\{(.+?)\}\}/g; //正则匹配所有{{}}内容
    var newdomhtml = [];
    for(var i = 0; i < doms.length; ++i) {
        var tmp = doms[i].innerHTML;
        //console.log(tmp);
        if (tmp.match(reg)) {
            var dommatch = tmp.match(reg);
            for (var j = 0; j < dommatch.length; ++j) {
                //console.log(dommatch[j].replace(/[{}]/g, ''));
                newdomhtml.push(dommatch[j].replace(/[{}]/g, ''));
            }
        }
        //console.log(data.data);
        /*循环上面得到的{{}}数组，得到对应的data的值*/
        var tmpStr = tmp;
        for (var k = 0; k < newdomhtml.length; ++k) {
            var datas = obj;
            var arrdata = newdomhtml[k].split(".");
            for (var l = 0; l <= arrdata.length - 1; ++l) {
                datas = datas[arrdata[l]];
            }
            //console.log(tmpStr);
            tmpStr = tmpStr.replace('{{' + newdomhtml[k] + '}}', datas); //匹配{{xxx}}的内容改成对应的值
        }

        doms[i].innerHTML = tmpStr;
    }
    this.data=obj;
    this.walk(obj,obj.el);
    //用来存放回调
    this.tmp={};
}

Vue.prototype = {
    walk: function (obj,el) {
        var val;
        for(var key in obj){
            if(obj.hasOwnProperty(key)){
                val = obj[key];
                if(typeof val==='object'){
                    this.walk(val,el);
                }
                this.convert(key,val,obj,el);
            }
        }
    },
    convert :function (key, val, obj,el) {
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
                /*console.log(val);
                console.log(pre);
                console.log(key);
                console.log(obj);*/
                //console.log('visited set');
                //触发事件
                _this.eventOn(key,pre,newVal,obj,el);
            }
        })
    },
    eventOn: function(key,pre,newVal,obj,el){
        var doms = document.getElementById(el.substr(1)).getElementsByTagName('p');
        var tmpStr;
        if(key === 'name'){
            console.log('name changed')
            tmpStr = doms[0].innerHTML;
            doms[0].innerHTML = tmpStr.replace(pre,newVal);
        }
        else if(key === 'age'){
            console.log('age changed')
            tmpStr = doms[1].innerHTML;
            doms[1].innerHTML = tmpStr.replace(pre,newVal);
        }
        var rootPre;
        //if key是嵌套属性
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
            //console.log('visited enventOn4');
            this.tmp[rootPre].forEach(function(sub){
                sub(pre,newVal);
            })
        }
    },
    //遍历找出obj的根属性
    getRootObj: function(rootObj,obj,rootProp){
        //console.log('visited getRootObj1');
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
        console.log(1);
        if(!this.tmp[key]){
            this.tmp[key] = [];
        }
        this.tmp[key].push(callback);
    }
}

var data = {
    el: '#app',
    user: {
        name: 'AK4TRl',
        age: 23
    }
}

var app = new Vue(data)

