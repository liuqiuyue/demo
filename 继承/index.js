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