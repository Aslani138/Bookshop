let deliveryDate = document.getElementById("deliveryDate");

let today =  new Date()
tomorrow = new Date(today.setDate(today.getDate() + 1))
const nextDate = tomorrow.toISOString().split('T')[0]

deliveryDate.setAttribute("min", nextDate);

const test = document.getElementsByTagName("form");
console.log(test)