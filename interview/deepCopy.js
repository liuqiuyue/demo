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