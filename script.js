/* =========================
   BIG HOMEPAGE COUNTERS
========================= */

const counters = document.querySelectorAll(".counter")

counters.forEach(counter => {

let target = +counter.getAttribute("data-target")
let count = 0

let updateCounter = () => {

let increment = target / 200

count += increment

if(count >= target){
counter.innerText = target.toLocaleString()
}
else{
counter.innerText = Math.floor(count).toLocaleString()
requestAnimationFrame(updateCounter)
}

}

updateCounter()

})

/* =========================
   HOMEPAGE COUNTERS
========================= */

function counter(id,target){

let count = 0
let element = document.getElementById(id)

if(!element) return

let interval = setInterval(()=>{

count += Math.ceil(target/100)

if(count >= target){
count = target
clearInterval(interval)
}

element.innerText = count.toLocaleString()

},20)

}

counter("users",900000)
counter("transactions",3200000)
counter("downloads",800000)


/* =========================
   TESTIMONIAL SLIDER
========================= */

let testimonialIndex = 0
const testimonial = document.querySelectorAll(".testimonial")

function showTestimonials(){

if(testimonial.length === 0) return

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


/* =========================
   DARK MODE
========================= */

const darkBtn = document.getElementById("darkToggle");

darkBtn.addEventListener("click", () => {
document.body.classList.toggle("dark-mode");
});


/* =========================
   BANK BALANCE SYSTEM
========================= */

let balance = localStorage.getItem("balance")
? parseFloat(localStorage.getItem("balance"))
: 24850


function updateBalanceDisplay(){

let balanceText = document.getElementById("balance")

if(balanceText){
balanceText.innerText = "$" + balance.toLocaleString()
}

}

updateBalanceDisplay()


/* =========================
   SEND MONEY SYSTEM
========================= */

const sendBtn = document.getElementById("sendBtn")

if(sendBtn){

sendBtn.addEventListener("click", function(){

let account = document.getElementById("account").value
let amount = document.getElementById("amount").value
let message = document.getElementById("transferMessage")

if(account === "" || amount === ""){
message.innerText = "Please enter account and amount"
return
}

amount = parseFloat(amount)

if(amount > balance){
message.innerText = "Insufficient Balance"
return
}

balance -= amount

localStorage.setItem("balance", balance)

updateBalanceDisplay()

addTransaction(account,amount)

updateChart()

showNotification(amount)

message.innerText = "Transfer Successful"

})

}


/* =========================
   TRANSACTION SYSTEM
========================= */

function addTransaction(account,amount){

let table = document.getElementById("transactionTable")

if(table){

let row = table.insertRow(-1)

row.innerHTML = `
<td>Today</td>
<td>Transfer to ${account}</td>
<td>-$${amount}</td>
<td>Completed</td>
`

}

let transactions = JSON.parse(localStorage.getItem("transactions")) || []

transactions.push({
date:"Today",
description:`Transfer to ${account}`,
amount:`-$${amount}`,
status:"Completed"
})

localStorage.setItem("transactions", JSON.stringify(transactions))

}


/* =========================
   LOAD SAVED TRANSACTIONS
========================= */

window.onload = function(){

updateBalanceDisplay()

let transactions = JSON.parse(localStorage.getItem("transactions")) || []

let table = document.getElementById("transactionTable")

if(table){

transactions.forEach(t => {

let row = table.insertRow(-1)

row.innerHTML = `
<td>${t.date}</td>
<td>${t.description}</td>
<td>${t.amount}</td>
<td>${t.status}</td>
`

})

}

}


/* =========================
   FINANCE CHART
========================= */

const ctx = document.getElementById("financeChart")

let chartData = [2000,3500,4200,3800,5200,6100]

let financeChart

if(ctx){

financeChart = new Chart(ctx,{

type:"line",

data:{
labels:["Jan","Feb","Mar","Apr","May","Jun"],
datasets:[{
label:"Account Balance",
data:chartData,
borderWidth:3
}]
},

options:{
responsive:true
}

})

}

function updateChart(){

if(!financeChart) return

chartData.push(balance)

financeChart.data.datasets[0].data = chartData

financeChart.update()

}


/* =========================
   NOTIFICATION SYSTEM
========================= */

function showNotification(amount){

let note = document.createElement("div")

note.className = "notification"

note.innerText = "$" + amount + " Transfer Completed"

document.body.appendChild(note)

setTimeout(()=>{
note.remove()
},4000)

}
const depositBtn = document.getElementById("depositBtn")

if(depositBtn){

depositBtn.addEventListener("click", function(){

let amount = parseFloat(document.getElementById("depositAmount").value)

if(!amount || amount <= 0) return

balance += amount

localStorage.setItem("balance", balance)

updateBalanceDisplay()

showNotification(amount)

})

}