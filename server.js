const express= require('express');
const Websocket= require('ws');
const cors= require('cors');
const http= require('http');

const app= express();
app.use(cors());

const server= http.createServer(app);
const wss=  new Websocket.Server({server});

let task03="";
wss.on('connection', (ws)=>{
    console.log('New client connected');

    ws.send(JSON.stringify({type: 'init', data: task03}));
    ws.on('message',(message)=> {
        try{
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.type === 'update'){
                task03 = parsedMessage.data;

                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN){
                        client.send(JSON.stringify({type: 'update' , data: task03}));
                    }
                });
            }
        } catch (error){
            console.error;{'Error parsing message:', error };
        }
    });
    ws.on('close',()=>{
        console.log('Client disconnected');
    });
});
const PORT =  5000;
server.listen(PORT, ()=>{
    console.log(`Server is listening on the port${PORT}`);
});


