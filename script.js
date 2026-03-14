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

let balance = localStorage.getItem("balance");

if(balance === null){
balance = 24850;
localStorage.setItem("balance", balance);
}

document.getElementById("balance").innerText = "$" + Number(balance).toLocaleString();


// SHOW NOTIFICATION

function notify(message){

const note = document.createElement("div");
note.className = "notification";
note.innerText = message;

document.body.appendChild(note);

setTimeout(()=>{
note.remove();
},3000);

}


// SEND MONEY

function sendMoney(){

let recipient = document.getElementById("recipient").value;
let amount = Number(document.getElementById("amount").value);

let balance = Number(localStorage.getItem("balance"));

if(recipient === "" || amount <= 0){
notify("Enter valid details");
return;
}

if(amount > balance){
notify("Insufficient Balance");
return;
}

balance -= amount;

localStorage.setItem("balance", balance);

document.getElementById("balance").innerText = "$" + balance.toLocaleString();

addTransaction("Transfer to " + recipient, "- $" + amount);

notify("Transaction Successful");

}


// DEPOSIT

function depositMoney(){

let amount = Number(document.getElementById("depositAmount").value);

if(amount <= 0){
notify("Enter valid deposit");
return;
}

let balance = Number(localStorage.getItem("balance"));

balance += amount;

localStorage.setItem("balance", balance);

document.getElementById("balance").innerText = "$" + balance.toLocaleString();

addTransaction("Deposit", "+ $" + amount);

notify("Deposit Successful");

}


// WITHDRAW

function withdrawMoney(){

let amount = Number(prompt("Enter Withdrawal Amount"));

let balance = Number(localStorage.getItem("balance"));

if(amount > balance){
notify("Insufficient Balance");
return;
}

balance -= amount;

localStorage.setItem("balance", balance);

document.getElementById("balance").innerText = "$" + balance.toLocaleString();

addTransaction("ATM Withdrawal", "- $" + amount);

notify("Withdrawal Successful");

}


// ADD TRANSACTION

function addTransaction(desc, amount){

let table = document.getElementById("transactionTable");

let row = table.insertRow(1);

let date = new Date().toLocaleDateString();

row.innerHTML = `
<td>${date}</td>
<td>${desc}</td>
<td>${amount}</td>
<td>Completed</td>
`;

}