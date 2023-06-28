
const express = require('express')
const app = express()

//將 express 放進 http 中開啟 Server 的 3000 port ，正確開啟後會在 console 中印出訊息
const server = require('http').Server(app)
    .listen(4000,()=>{console.log('open server!')})

//將啟動的 Server 送給 socket.io 處理
const io = require('socket.io')(server)

/*上方為此寫法的簡寫：
  const socket = require('socket.io')
  const io = socket(server)
*/

//監聽 Server 連線後的所有事件，並捕捉事件 socket 執行
io.on('connection', socket => {
    //經過連線後在 console 中印出訊息
    console.log('success connect!')
    // //監聽透過 connection 傳進來的事件
    // socket.on('getMessage', message => {
    //     //回傳 message 給發送訊息的 Client
    //     socket.emit('getMessage', message)
    // })
    socket.on('addRoom', room => {
       
        socket.join(room)
        //(1)發送給在同一個 room 中除了自己外的 Client
        socket.to(room).emit('addRoom', '已有新人加入聊天室！')
        //(2)發送給在 room 中所有的 Client
        io.sockets.in(room).emit('addRoom', '已加入聊天室！')
    })
    /*只回傳給發送訊息的 client*/
    socket.on('getMessage', message => {
        socket.emit('getMessage', message)
    })

    /*回傳給所有連結著的 client*/
    socket.on('getMessageAll', message => {
        io.sockets.emit('getMessageAll', message)
    })

    /*回傳給除了發送者外所有連結著的 client*/
    socket.on('getMessageLess', message => {
        socket.broadcast.emit('getMessageLess', message)
    })

    
    //送出中斷申請時先觸發此事件
    socket.on('disConnection', message => {
        const room = Object.keys(socket.rooms).find(room => {
            return room !== socket.id
        })
        //先通知同一 room 的其他 Client
        socket.to(room).emit('leaveRoom', `${message} 已離開聊天！`)
        //再送訊息讓 Client 做 .close()
        socket.emit('disConnection', '')
    })

    //中斷後觸發此監聽
    socket.on('disconnect', () => {
        console.log('disconnection')
    })

})