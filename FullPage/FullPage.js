const items = JSON.parse(sessionStorage.getItem("marketItems")) || []
const selectedId = sessionStorage.getItem("selectedItemId")

const item = items.find(i => i.id == selectedId)



const image = document.querySelector("img")
image.src = item.images[0]

document.querySelector("#itemName").textContent = item.name
document.querySelector("#itemPrice").textContent =   item.price +"€"
document.querySelector("#itemDescription").textContent = item.description
 
const input = document.querySelector(".Msg--Text--Inp")
const sendBtn = document.querySelector(".Msg--Sent--Button")
const msgArea = document.querySelector(".Msg--Sent--Area")

let messages = []

sendBtn.addEventListener("click", () => {
  const text = input.value.trim()
  if (text === "") return

  messages.push(text)
  input.value = ""

  msgArea.innerHTML = ""
  messages.forEach(msg => {
    const div = document.createElement("div")
    div.textContent = msg
    msgArea.appendChild(div)
  })
})
