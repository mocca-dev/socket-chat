import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
const SOCKET_SERVER_URL = 'http://localhost:8080';

const useChat = (roomId) => {
  const socketRef = useRef();
  const [messages, setMessages] = useState('');

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, { query: roomId });
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = ({ message, username }) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: { message, username },
      senderId: socketRef.current.id,
    });
  };
  return { messages, sendMessage };
};

export default useChat;
