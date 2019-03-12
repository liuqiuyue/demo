class ParentClass {
  constructor(name) {
    this.name = name;
  }
  static sayHello() {
    console.log("I'm parent!" + this.name);
  }

  static testFunc() {
    console.log('emm...Parent test static Func')
  }
}

class SubClass extends ParentClass {
  constructor(name) {
    super(name);
  }
  sayChildHello() {
    console.log("I'm child " + this.name)
  }
  static sayHello() {
    console.log("override parent method !,I'm sayHello Method")
  }

  static testFunc2() {
    console.log(super.testFunc() + 'fsdafasdf');
  }
}
ParentClass.sayHello(); // success print

let a = new ParentClass('test');
a.sayHello() // throw error

SubClass.sayHello(); // 同名 static 可以继承且覆盖

SubClass.testFunc2(); // 可以继承

let testA = new SubClass('CRPER');


var temp = arr.split('').map(function (item) {
  return /^\d$/.test(item) ? item * 2 : item;
}).join('');

function sleep(time) {
  var temp = new Promise(
    (resolve) => {
      console.log(111);
      setTimeout(resolve, time);
    })
  return temp;
}
sleep(500).then({
  function () {
    console.log(222);
  }
})

//promise初步
function mypromise(constructor) {
  let self = this;
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;

  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'resolved';
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
    }
  }
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e)
  }
}
mypromise.prototype.then = function (onfullfilled, onrejected) {
  var self = this;
  switch (self.status) {
    case "resolved":
      onfullfilled(self.value);
      break;
    case "rejected":
      onrejected(self.reason);
      break;
    default:
      ;
  }
}