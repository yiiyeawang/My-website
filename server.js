const express = require('express')
const SockerServer = require('ws').Server

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const PORT = 3000
const server = express().listen(PORT,() => console.log(`Listening on ${PORT}`))
const wss = new SockerServer({server})

wss.on('connection',ws => {
    //console.log('這是伺服器端，Client connection')
    //固定送最新時間給 Client
    //  setInterval(()=>{
    //     console.log('推送時間')
    //     ws.send(String(new Date()))
    // },30000)
    // ws.on('message', data => {
    //     //data 為 Client 發送的訊息，現在將訊息原封不動發送出去
    //      console.log('接收到訊息： %s', data);
    //     // ws.send(data)
    //     //取得所有連接中的 client
    //     let clients = wss.clients

    //     //做迴圈，發送訊息至每個 client
    //     clients.forEach(client => {
    //         client.send(data)
    //     })
    // })
    ws.on('getMessage',(data) => {
        console.log('接收到訊息： %s', data);
    })
    ws.on('close',() => {
        //clearInterval(sendNowTime)
        console.error
        console.log('CLose connected')
    })
})