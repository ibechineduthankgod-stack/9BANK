function counter(id,target){

let count=0
let element=document.getElementById(id)

let interval=setInterval(()=>{

count+=Math.ceil(target/100)

if(count>=target){
count=target
clearInterval(interval)
}

element.innerText=count.toLocaleString()

},20)

}

counter("users",900000)
counter("transactions",3200000)
counter("downloads",800000)