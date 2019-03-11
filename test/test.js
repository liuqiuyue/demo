//JS堆、栈以及事件循环的概念


//1
console.log(1)
let promise = new Promise(function(resolve,reject){
    console.log(3)
    resolve(100)
}).then(function(data){
    console.log(100)
})
setTimeout(function(){
    console.log(4);
})
console.log(2)

 

// 举一个🌰说明栈的执行方式
var a = "aa";
function one(){
    let a = 1;
    two();
    function two(){
        let b = 2;
        three();
        function three(){
            console.log(b)
        }
    }
}
console.log(a);
one();

// 那队列又是怎么一回事呢？
//队列1-首先执行了栈里的代码，1 2 5。 前面说到的settimeout会被放在队列里，当栈执行完了之后，从队列里添加到栈里执行（此时是依次执行），得到 3 4
console.log(1);
console.log(2);
setTimeout(function(){
    console.log(3);
})
setTimeout(function(){
    console.log(4);
})
console.log(5);


//队列2- 同样，先执行栈里的同步代码 1 2 5. 再同样，最外层的settimeout会放在队列里，当栈里面执行完成以后，放在栈中执行，3 4。 而嵌套的2个settimeout，会放在一个新的队列中，去执行 6 7.
console.log(1);
console.log(2);

setTimeout(function(){
    console.log(3);
    setTimeout(function(){
        console.log(6);
    })
})
setTimeout(function(){
    console.log(4);
    setTimeout(function(){
        console.log(7);
    })
})
console.log(5)


// 队列3- ：这里的顺序是1，2，5，4，7，3，6。也就是只要两个set时间不一样的时候 ，就set时间短的先走完，包括set里面的回调函数，再走set时间慢的。（因为只有当时间到了的时候，才会把set放到队列里面去）
console.log(1);
console.log(2);

setTimeout(function(){
    console.log(3);
    setTimeout(function(){
        console.log(6);
    })
},400)
setTimeout(function(){
    console.log(4);
    setTimeout(function(){
        console.log(7);
    })
},100)
console.log(5)


// 再再再看一个🌰
setTimeout(function(){
  console.log('setTimeout')
},0)
for(var i = 0;i<10;i++){
  console.log(i)
}


// 再回到我们的第一个🌰
console.log(1)
let promise = new Promise(function(resolve,reject){
    console.log(3)
    resolve(100)
}).then(function(data){
    console.log(100)
})
setTimeout(function(){
    console.log(4);
})
console.log(2)

