(function () {
    var ul = document.getElementById('source');
    var btn = document.getElementById('button');
    var sourceLi = ul.getElementsByTagName("li");
    var key = document.getElementById('searchKey')
    btn.onclick = function (event) {
        switch (event.target.id){
            case 'leftIn' : leftAdd(); break;
            case 'rightIn' : rightAdd(); break;
            case 'leftOut' : leftRemove(); break;
            case 'rightOut' : rightRemove(); break;
            case 'search' : changeColor(); break;
        }
    }

    function changeColor() {
        var keyValue = key.value;
        for(var i = 0; i < sourceLi.length; ++i){
            (function(){
                var text = sourceLi[i].innerText.toString();
                console.log(text);
                if(text === keyValue){
                    sourceLi[i].classList.remove('rq');
                    sourceLi[i].classList.add('change');
                }
                else{
                    if(sourceLi[i].className.concat('change')){
                        sourceLi[i].classList.remove('change');
                        sourceLi[i].classList.add('rq');
                    }
                }
            })()
        };
    }

    function rightAdd() {
        var num = document.getElementById('input1').value;
        var newNode = document.createElement('li');
        newNode.innerHTML = num;
        newNode.className = 'rq';
        ul.appendChild(newNode)
    }
    function leftAdd() {
        var num = document.getElementById('input1').value;
        var newNode = document.createElement('li');
        newNode.innerHTML = num;
        newNode.className = 'rq';
        ul.insertBefore(newNode,ul.getElementsByTagName('li')[0])
    }

    function rightRemove() {
        ul.removeChild(ul.lastElementChild);
    }
    function leftRemove() {
        //console.log(ul.firstElementChild)
        ul.removeChild(ul.firstElementChild);
    }

})();