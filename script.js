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

let index=0
let testimonialIndex = 0;

const testimonial = document.querySelectorAll(".testimonial");

function showTestimonials(){

testimonial.forEach(t=>{
t.classList.remove("active")
})

testimonial[testimonialIndex].classList.add("active")

testimonialIndex++

if(testimonialIndex >= testimonial.length){
testimonialIndex = 0
}

}

setInterval(showTestimonials,4000)
const counters=document.querySelectorAll(".counter")

counters.forEach(counter=>{

counter.innerText="0"

const updateCounter=()=>{

const target=+counter.getAttribute("data-target")

const c=+counter.innerText

const increment=target/200

if(c<target){

counter.innerText=`${Math.ceil(c+increment)}`

setTimeout(updateCounter,10)

}else{

counter.innerText=target

}

}

updateCounter()

})