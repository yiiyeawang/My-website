import React, { useState ,useEffect} from 'react';
import { ReactDOM } from 'react';
import { DatePicker, message, Alert } from "antd";
import WebSocket from 'socket.io-client';


const About = () => {
    const [ws,setws] = useState(null)
    const conectWebsocket = () => {
        setws(WebSocket('http://localhost:4000', { transports: ['websocket'] }))
    }
    useEffect(()=>{
        if (ws) {
           console.log("連線成功");
           initWebSocket(); 
        }
    },[ws])
    const initWebSocket = () => {
        //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
        // ws.on('getMessage', message => {
        //     console.log(message)
        // })
        ws.on('getMessage', message => {
            console.log(message)
        })
        ws.on('getMessageAll', message => {
            console.log(message)
        })
        ws.on('getMessageLess', message => {
            console.log(message)
        })
         //增加監聽
        ws.on('addRoom', message => {
            console.log(message)

        })
        //以 leaveRoom 接收有使用者離開聊天的訊息
        ws.on('leaveRoom', message => {
            console.log(message)
        })
        // Server 通知完後再傳送 disConnection 通知關閉連線
        ws.on('disConnection', () => {
            ws.close()
        })
    }
    const sendMessage = (name) => {
        //ws.emit('getMessage','只回傳給發送訊息的client')
        //console.log('發訊息')
        
        //if (ws !== null) {
            ws.emit(name,'只回傳給發送訊息的client');
        //  } else {
        //    console.log(`WebSocket 尚未連線`);
        //  }
    }
    //選擇聊天室時觸發，如果有選擇那就將房間 id 送給 Server
    const changeRoom = (event) => {
        let room = event.target.value

         if(room !== ''){
             ws.emit('addRoom', room)
         }
    }
    const disConnectWebSocket = () =>{
        //向 Server 送出申請中斷的訊息，讓它通知其他 Client
        ws.emit('disConnection', 'XXX')
    }
  return (
    
    <>
        <select onChange={changeRoom}>
            <option value=''>請選擇房間</option>
            <option value='room1'>房間一</option>
            <option value='room2'>房間二</option>
        </select>
        <button onClick={conectWebsocket}>連線</button>
        <input type='button' value='送出訊息，只有自己收到回傳' onClick={() => { sendMessage('getMessage') }} />
        <input type='button' value='送出訊息，讓所有人收到回傳' onClick={() => { sendMessage('getMessageAll') }} />
        <input type='button' value='送出訊息，除了自己外所有人收到回傳' onClick={() => { sendMessage('getMessageLess') }} />
        <input type='button' value='斷線' onClick={disConnectWebSocket} />
    </>
  );
};

export default About;