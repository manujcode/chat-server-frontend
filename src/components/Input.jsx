import React from 'react';

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="flex items-center mt-4 border-t border-gray-200 pt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={sendMessage}
        className="ml-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Send
      </button>
    </div>
  );
};

export default Input;
