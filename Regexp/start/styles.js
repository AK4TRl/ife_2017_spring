var nItems = document.getElementsByTagName('li');
var nInput = document.getElementsByTagName('input');
var nForm = document.getElementsByTagName('form');
var nNotice = document.getElementsByTagName('span');


var task1 = {
    error:'请输入一个合法的手机号',
    succ:'你输入了正确的手机号码。'
};
var task2 = {
    error:'出现相邻且重复单词！',
    succ:'没有重复单词'
};

//事件绑定
nForm[0].addEventListener('submit', testPhoneNum);
nForm[1].addEventListener('submit', testStrRepeat);

function testPhoneNum(e) {
    e.preventDefault();
    var num = nInput[0].value;
    var reg = /^1(3|4|5|8)\d{9}$/;
    var result_1 = reg.test(num);
    return result_1 ? testNotice(nNotice[0],'succ') : testNotice(nNotice[0],'error');
}

function testStrRepeat(e) {
    e.preventDefault();
    var str = nInput[1].value;
    var reg = /([A-Za-z]+)/g;
    var result_2 = str.match(reg);
    var repeat = false;
    for(var i = 1; i <= result_2.length - 2; ++i){
        if(repeat == true) break;
        //console.log(result_2[i]);
        if(result_2[i - 1] == result_2[i] || result_2[i] == result_2[i + 1])
            repeat = true;
    }
    return repeat ? testNotice(nNotice[1],'error') : testNotice(nNotice[1],'succ');
}

function testNotice(node,type) {
    node.className ='notice '+ type;
    node.innerHTML=node===nNotice[0]?task1[type]:task2[type];
}