多看一些🌰
console.log(1);
setTimeout(function(){
    console.log(2);
    Promise.resolve(1).then(function(){
        console.log('promise1')
    })
})
setTimeout(function(){
    console.log(3)
    Promise.resolve(1).then(function(){
        console.log('promise2')
    })
})
setTimeout(function(){
    console.log(4)
    Promise.resolve(1).then(function(){
        console.log('promise3')
    })
})


作者：薄荷前端
链接：https://juejin.im/post/5b1deac06fb9a01e643e2a95
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。