const items = JSON.parse(sessionStorage.getItem("marketItems")) || []
const selectedId = sessionStorage.getItem("selectedItemId")

const item = items.find(i => i.id == selectedId)



const image = document.querySelector("img")
image.src = item.images[1]

document.querySelector("#itemName").textContent = item.name
document.querySelector("#itemPrice").textContent =   item.price +"€"
document.querySelector("#itemDescription").textContent = item.description
 
const input = document.querySelector(".Msg--Text--Inp")
const sendBtn = document.querySelector(".Msg--Sent--Button")
const msgArea = document.querySelector(".Msg--Sent--Area")




