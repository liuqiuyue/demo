var data={};
var input=document.querySelector('input');
Object.defineProperty(data,'txt',{
  set(val){
    data.val=val;
    input.val=val;
  }
})

input.onchange=function(e){
data.txt=e.target.value;
}