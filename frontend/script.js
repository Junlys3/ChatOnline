//login captura



const login = document.querySelector(".login")
const loginform = document.querySelector(".login-form")
const loginInput = document.querySelector(".login-input")

//Chat
const chat = document.querySelector(".chat")
const chatform = document.querySelector(".chat-form")
const chatinput = document.querySelector(".chat-input")
const chatmensagens = document.querySelector(".chat-mensagens")

const colors=[
    "cadetblue",
    "gold",
    "blue",
    "pink"

]

const getRamdomColor = () =>{
    const randomindex = Math.floor(Math.random() * 4)
    return colors[randomindex]
}

const user = {
id: "", name: "", color: ""

}

let ws

const createMessageSelf = (content) =>{


  const div = document.createElement("div")
  div.classList.add("myMessage")
  div.innerHTML = content
  return div
  
}

const createMessageOther = (content, person, personColor) =>{
  const div = document.createElement("div")
  const span = document.createElement("span")

  div.classList.add("otherMessage")
  span.classList.add("otherMessageSender")
  span.style.color = personColor

  div.appendChild(span)

  span.innerHTML = person



  div.innerHTML += content

  return div
}







const messageProcess = (evt)=>{

 const userparse = JSON.parse(evt.data)

  const useridd = userparse.userid
  const usernamee = userparse.userName
  const usercolorr = userparse.userColor
  const usercontent = userparse.content



 if(useridd == user.id){
  const selfreturn = createMessageSelf(usercontent)
   chatmensagens.appendChild(selfreturn)
  
 }else{
   const otherreturn = createMessageOther(usercontent, usernamee, usercolorr)
   chatmensagens.appendChild(otherreturn)
 }
  

  

  

}



const SubmitFormLogin = (event) =>{
  event.preventDefault()
  user.id = crypto.randomUUID()
  user.name = loginInput.value
  user.color = getRamdomColor()

  login.style.display = "none"
  chat.style.display = "flex"


  ws = new WebSocket("wss://chatonline-backend.onrender.com")

  ws.onmessage = messageProcess

  
}

 
const sendservermessage = (event) =>{
   event.preventDefault()
  const message = {
    userid: user.id,
    userName: user.name,
    userColor: user.color,
    content:chatinput.value
  }

   ws.onopen=()=>  ws.send(JSON.stringify(message))




    chatinput.value = ""


}

  


loginform.addEventListener("submit", SubmitFormLogin)
chatform.addEventListener("submit", sendservermessage)