// 同步运行时错误
// try{
//   let name='john';
//   console.log(nam);

// }catch(e){
//   console.log('捕获到异常',e);
// }

// 语法错误
// try{
//   let name='john;
//   console.log(nam);

// }catch(e){
//   console.log('捕获到异常',e);
// }

// 3、异步错误
// try{
//   setTimeout(() => {
//     undefined.map(v=>v)
//   }, 1000)
// }catch(e){
//   console.log('捕获到异常',e);
// }

// 同步运行时错误
// window.onerror = function (msg, url, row, col, error) {
//   console.log('我知道错误了');
//   console.log({
//     msg,
//     url,
//     row,
//     col,
//     error
//   })
//   return true;
// };
// John

// 语法错误
// window.onerror = function (msg, url, row, col, error) {
//   console.log('我知道错误了');
//   console.log({msg, url, row, col, error})
// };
// let name='John      
 
// 异步运行时错误
// window.onerror = function (msg, url, row, col, error) {
//   console.log('我知道错误了');
//   console.log({msg, url, row, col, error})
//   return true
// };
// setTimeout(function () {
//    John
// }, 0);

// window.addEventListener('error',(error)=> { console.log('我知道错误了',error);
//  },true)

// window.addEventListener('load',function () {
//   sessionStorage.setItem('good_exit','pending');
//   setInterval(() => {
//     sessionStorage.setItem('time_before_crash',new Date().toString());
//   },1000)
// })
// window.addEventListener('beforeunload',function () {
//   sessionStorage.setItem('good_exit','true');
// })
// if( sessionStorage.getItem('good_exit')&&sessionStorage.getItem('good_exit')!=='true'){
//   // insert crash logging code here
//     alert('我知道错误了'+sessionStorage.getItem('time_before_crash'))
// }

// function report(error) {
//   let reportUrl='http://giveMeError/report';
//   new Image().src=`${reportUrl}?logs=${error}`;
// }

// Reporter.send=function (data) {
//   if(Math.random()<0.3){
//     send(data)
//   }
// }


// window.addEventListener("unhandledrejection", function(e){
//   e.preventDefault()
//   console.log('我知道 promise 的错误了');
//   console.log(e.reason);
//   return true;
// });
// Promise.reject('promise error');
// new Promise((resolve, reject) => {
//   reject('promise error');
// });
// new Promise((resolve) => {
//   resolve();
// }).then(() => {
//   throw 'promise error'
// });
