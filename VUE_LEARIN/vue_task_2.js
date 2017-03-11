// 监听对象的改变
function Observer(obj) {
    this.data = obj
    this.walk(obj)
    this.eventBus = new Event()
}

// 此函数用于深层次遍历对象的各个属性
// 采用的是递归的思路
// 因为我们要为对象的每一个属性绑定getter和setter

Observer.prototype = {
    convert: function (key, val) {
        var _this = this
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                console.log('你访问了' + key);
                return val
            },
            set: function (newVal) {
                console.log('你设置了' + key);
                console.log('新的' + key + ' = ' + newVal)
                _this.eventBus.emit(key, val, newVal)

                if(val === newVal)  return
                val = newVal;
                //判断当前是否对象
                if (typeof val === 'object')
                    new Observer(val);
            }
        })
    },
    walk: function (obj) {
        var val;
        for (var key in obj) {
            // 这里为什么要用hasOwnProperty进行过滤呢？
            // 因为for...in 循环会把对象原型链上的所有可枚举属性都循环出来
            // 而我们想要的仅仅是这个对象本身拥有的属性，所以要这么做。
            if (obj.hasOwnProperty(key)) {
                val = obj[key];

                // 这里进行判断，如果还没有遍历到最底层，继续new Observer
                if (typeof val === 'object') {
                    new Observer(val);
                }
                this.convert(key, val);
            }
        }
    },
    $watch: function (key, handler) {
        this.eventBus.on(key, handler)
    }
}

// 利用事件模型给监听增加回调
function Event() {
    this.handlers = {}
}

Event.prototype = {
    on: function (eventName, handler) {
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = []
        }
        this.handlers[eventName].push(handler)
        return this
    },
    emit: function (eventName, ...arg) {
    if (this.handlers[eventName]) {
        this.handlers[eventName].forEach(handler => handler(...arg))
    }
}
}

var app = new Observer({
    basicInfo: {
        fullname: 'weijinhui',
        age: 25
    },
    age: 25,
    name: 'AK4TRL',
    address: 'zhongshan'
})

// 监听age字段
app.$watch('age', function (val, newVal) {
    console.log('我刚刚还是' + val + '岁，现在突然' + newVal + '岁了，好神奇！')
})
app.$watch('age', function (val, newVal) {
    console.log('真的变化了' + (newVal - val) + '岁耶')
})
app.$watch('name',function (val, newVal) {
    console.log('我刚刚还叫'+val + '现在被重新起了一个名字叫'+newVal);
})
