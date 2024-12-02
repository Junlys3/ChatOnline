const { WebSocketServer} = require("ws")
const doteny = require("dotenv")

doteny.config()

const wss = new WebSocketServer({port: 8080})

wss.on("connection", (ws)=>{
    ws.on("error", console.error)

    ws.on("message", (mensagem)=>{
        wss.clients.forEach((client)=>{
            client.send(mensagem.toString())
        })
    })

    console.log("teste")
}) 