import React from 'react';

const Message = ({ sender="bot", text="hello" }) => {
  return (
    <div className={`flex ${sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${sender === 'bot' ? 'bg-gray-200 text-black' : 'bg-green-500 text-white'}`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
