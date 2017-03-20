(function () {
    var ul = document.getElementById('source');
    var btn = document.getElementById('button');
    var sourceLi = ul.getElementsByTagName("li");
    var arr = [];

    //更新数组
    function arrUpload(){
        arr = [];
        for(var i = 0; i < sourceLi.length; ++i){
            arr.push(sourceLi[i].innerHTML);
        };
        // console.log(arr)
    }

    btn.onclick = function (event) {
        switch (event.target.id){
            case 'leftIn' : leftAdd(); break;
            case 'rightIn' : rightAdd(); break;
            case 'leftOut' : leftRemove(); break;
            case 'rightOut' : rightRemove(); break;
        }
        arrUpload();
        outputHTML(arr);
    }

    function rightAdd() {
        var num = document.getElementById('input1').value;
        if(!isNaN(num)){
            var newNode = document.createElement('li');
            newNode.innerHTML = num;
            newNode.className = 'rq';
            ul.appendChild(newNode)
        }
    }
    function leftAdd() {
        var num = document.getElementById('input1').value;
        if(!isNaN(num)){
            var newNode = document.createElement('li');
            newNode.innerHTML = num;
            newNode.className = 'rq';
            ul.insertBefore(newNode,ul.getElementsByTagName('li')[0])
        }
    }

    function rightRemove() {
        ul.removeChild(ul.lastElementChild);
    }
    function leftRemove() {
        //console.log(ul.firstElementChild)
        ul.removeChild(ul.firstElementChild);
    }

    function outputHTML(arr){
        ul.innerHTML = "";
        arr.sort(function(a,b){
            return a-b;
        })
        for(var i = 0; i < arr.length; ++i){
            source.innerHTML += '<li style="height:'+arr[i]+'px;">'+arr[i]+'</li>';
        }
    }
})();