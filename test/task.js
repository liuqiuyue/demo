// 一个新的🌰
console.log('1');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('2');

// 多看一些🌰
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


console.log(1);
setTimeout(function(){
    console.log(2);
    Promise.resolve(1).then(function(){
        console.log('promise1')

        setTimeout(function(){
            console.log(3)
            Promise.resolve(1).then(function(){
                console.log('promise2')
            })
        })

    })
})


