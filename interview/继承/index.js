function Animal(name){
    this.name=name||'Animal';
    this.sleep=function(){
        console.log('sleep');
    }
}
Animal.prototype.eat=function(){
    console.log('eat');
}

//寄生组合继承
function Cat(name) {
    Animal.call(this);
    this.name=name||'cat';
}
(function(){
    var Super=function(){};

    Super.prototype=Animal.prototype;
    Cat.prototype=new Super();
})()



// a.prototype.multiply=function(){
//   return this.map(function (item) {
// return item*
//     })
// }

var arr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 7,8,8,0,8,6,3,4,56,2];
var arr2 = arr.filter((x, index,self)=>
    self.indexOf(x)===index)  

console.log(arr2); //[1, 2, 3, 4, 5, 6, 7, 8, 0, 56]