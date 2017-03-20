(function () {
    var ul = document.getElementById('source');
    var btn = document.getElementById('button');
    btn.onclick = function (event) {
        switch (event.target.id){
            case 'leftIn' : leftAdd(); break;
            case 'rightIn' : rightAdd(); break;
            case 'leftOut' : leftRemove(); break;
            case 'rightOut' : rightRemove(); break;
        }
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

})();