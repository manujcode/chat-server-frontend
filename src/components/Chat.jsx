import React, { useEffect, useState } from 'react';
import Message from './Message';
import Input from './Input';

import { io } from 'socket.io-client';
import ChatHeader from './top';

const socket = io('https://chat-server-backend-1.onrender.com');

const ChatApp = () => {
  const [messages, setMessages] = useState(JSON.parse(sessionStorage.getItem("chatMessages"))||[
    { sender: 'bot', text: 'Hello! How can I help you today?' },
  ]);
  
  const [message, setMessage] = useState('');
   
    socket.on('send-to-user',(msg)=>{
        console.log(msg);
        let temp = [...messages,{sender:'bot',text:msg.text}]
        setMessages([...messages,{sender:'bot',text:msg.text}])
        setTimeout(()=>{
          sessionStorage.setItem("chatMessages", JSON.stringify(temp));
        },500)
      })

    




 
  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: message }]);
      
      socket.emit('send-To-Server' ,{ sender: 'user', text: message })
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <div className="overflow-y-auto h-96">
          <div className="space-y-4">
            <div className='flex justify-between text-red-600 font-bold  '><span className='bg-lime-500 p-2 rounded-xl' >server</span>
            <span className='bg-lime-500 p-2 rounded-xl'>client</span></div>
            {messages.map((msg, index) => (
              <Message key={index} sender={msg.sender} text={msg.text} />
            ))}
          </div>
        </div>
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatApp;
