import React,{useState, useEffect} from 'react';
import './App.css'; //Codeium: Refactor | Explain | Generate JSDoc | X 

function App(){
  const [task03, settask03]= useState("");
  const [socket, setSocket]= useState(null);

  useEffect(()=> {
    const newSocket= new WebSocket('ws://localhost:5000');
    setSocket(newSocket);
   //Codeium: Refactor | Explain | Generate JSDoc | X
   newSocket.onopen= ()=>{
    console.log('WebSocket connection establishing');
   }; //Codeium: Refactor | Explain | Generate JSDoc | X

   newSocket.onmessage= (event)=>{
    try{
      const message= JSON.parse(event.data);
      if(message.type=== 'init'){
        settask03(message.data);
      } else if (message.type=== 'update'){
        settask03(message.data);
      } 
    }catch(error){
      console.error('Error parsing message:', error);
    }
   };
                   //Codeium: Refactor | Explain | Generate JSDoc | X
    newSocket.onclose= ()=>{
      console.log('WebSocket connection close');
    }; //Codeium: Refactor | Explain | Generate JSDoc | X

    newSocket.onerror= (error)=>{
      console.error('WebSocket error:', error);
    };

    return()=>{
      newSocket.close();
    };
  },);
  //Codeium: Refactor | Explain | Generate JSDoc | X
  const handleChange= (e)=>{
    const newtask03= e.target.value;
    settask03(newtask03);
    if(socket && socket.readyState=== WebSocket.OPEN){
      socket.send(JSON.stringify({type: 'update', data: 'newtask03'}));
    }
  };

  return (
    <div className ="App">
    <h1><b> Collaborative Document Editor. </b> </h1>
    <textarea 
               value={task03}
               onChange={handleChange}
               rows="20"
               cols="80"
              />
              </div>
  );
};

export default App;