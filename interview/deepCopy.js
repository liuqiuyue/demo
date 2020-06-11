function isObj(obj){
  return (typeof obj === 'object'||typeof obj === 'function')&&obj!==null
}
function deepCopy(obj){
  var newObj=Array.isArray(obj)?[]:{};
  for (var i in obj){
    newObj[i]=isObj(obj)?deepCopy(obj[i]):obj[i];
  }
  return newObj;
}
// objectFactory(name, 'cxk', '18')new操作符
function objectFactory() {
  const obj = new Object();
  const Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  const ret = Constructor.apply(obj, arguments);

  return typeof ret === "object" ? ret : obj;
}

function new(func) {
	lat target = {};
	target.__proto__ = func.prototype;
	let res = func.call(target);
	if (typeof(res) == "object" || typeof(res) == "function") {
		return res;
	}
	return target;
}
//  按照如下要求实现Person 和 Student 对象
//  a)Student 继承Person
//  b)Person 包含一个实例变量 name， 包含一个方法 printName
//  c)Student 包含一个实例变量 score， 包含一个实例方法printScore
//  d)所有Person和Student对象之间共享一个方法
class Person {
  constructor(name) {
      this.name = name;
  }
  printName() {
      console.log('This is printName');
  }
  commonMethods(){
      console.log('我是共享方法');
  }
}

class Student extends Person {
  constructor(name, score) {
      super(name);
      this.score = score;
  }
  printScore() {
      console.log('This is printScore');
  }
}

let stu = new Student('小红');
let person = new Person('小紫');
console.log(stu.commonMethods===person.commonMethods);//true
// Q: 写一个二分法查找
// 二分法跟快排的思路差不多,对半比较
// 这个只用于排序好数组内的查询,高低位都知道的情况下
function binSearch(target, arr, start, end) {
  var start = start || 0; // 允许从什么位置开始,下标
  var end = end || arr.length - 1; // 什么位置结束,下标
  start >= end ? -1 : ''; // 没有找到,直接返回-1
  var mid = Math.floor((start + end) / 2); // 中位下标
  if (target == arr[mid]) {
    return mid; // 找到直接返回下标
  } else if (target > arr[mid]) {
    //目标值若是大于中位值,则下标往前走一位
    return binSearch(target, arr, start, mid - 1);
  } else {
    //若是目标值小于中位值,则下标往后退一位
    return binSearch(target, arr, mid + 1, end);
  }
}

// binSearch(5,[1,2,3,4,5,6,7,8]) => 4

// 无序的数组则需要先排序好数组,否则会堆栈溢出(死循环)
