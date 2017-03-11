"use strict"
function Vue(data) {
    if (!(data.el)) {
        throw "没有绑定元素";
        return;
    }
    var doms = document.getElementById(data.el.substr(1)).getElementsByTagName('p');
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
            var datas = data.data;
            var arrdata = newdomhtml[k].split(".");
            for (var l = 0; l <= arrdata.length - 1; ++l) {
                datas = datas[arrdata[l]];
            }
            tmpStr = tmpStr.replace('{{' + newdomhtml[k] + '}}', datas); //匹配{{xxx}}的内容改成对应的值
        }
        doms[i].innerHTML = tmpStr;
    }
}

var app = new Vue({
    el: '#app',
    data: {
        user: {
            name: 'AK4TRl',
            age: 23
        }
    }
});
