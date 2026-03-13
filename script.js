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
function sendMoney(){

let amount=document.getElementById("amount").value

let message=document.getElementById("transferMessage")

if(amount===""){

message.innerText="Enter an amount"

return
updateChart(amount);
}

message.innerText="Transfer Successful"

addTransaction(amount)

updateBalance(amount)

}
let balance = 24850;

const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", function(){

let account = document.getElementById("account").value;

let amount = document.getElementById("amount").value;

let message = document.getElementById("transferMessage");

if(account === "" || amount === ""){

message.innerText = "Please enter account and amount";
return;

}

amount = parseFloat(amount);

if(amount > balance){

message.innerText = "Insufficient Balance";
return;

}

balance -= amount;

document.getElementById("balance").innerText = "$" + balance;

message.innerText = "Transfer Successful";

addTransaction(account, amount);

showNotification(amount);

});

function addTransaction(account, amount){

let table = document.getElementById("transactionTable");

let row = table.insertRow(-1);

row.innerHTML = `
<td>Today</td>
<td>Transfer to ${account}</td>
<td>-$${amount}</td>
<td>Completed</td>
`;

}

const ctx = document.getElementById("financeChart");

let chartData = [2000,3500,4200,3800,5200,6100];

const financeChart = new Chart(ctx,{

type:"line",

data:{
labels:["Jan","Feb","Mar","Apr","May","Jun"],
datasets:[{
label:"Account Balance",
data:chartData,
borderWidth:3
}]
},

options:{responsive:true}

});

function updateChart(amount){

chartData.push(balance);

financeChart.update();

}
function showNotification(amount){

let note = document.createElement("div");

note.className = "notification";

note.innerText = "$" + amount + " Transfer Completed";

document.body.appendChild(note);

setTimeout(()=>{
note.remove();
},4000);

}
const toggle=document.getElementById("darkToggle");

toggle.addEventListener("click",()=>{

document.body.classList.toggle("dark-mode");

});