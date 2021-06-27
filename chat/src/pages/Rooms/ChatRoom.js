import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useChat from '../../hooks/useChat';
import sendIcon from './send-icon.png';

const ChatRoom = ({ match }) => {
  const { roomId, username } = match.params;
  const { messages, sendMessage } = useChat(roomId);
  const [message, setMessage] = useState('');
  const messagesEnd = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendHandler = ({ message, username }) => {
    if (message) {
      sendMessage({ message, username });
      setMessage('');
      scrollToBottom();
    }
  };

  const sendOnEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendHandler({ message, username });
    }
  };

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat-room-container">
      <h3>
        <Link to="/">
          <button className="home-button">{'<'}</button>
        </Link>
        {roomId}
      </h3>
      <div className="messages-container">
        {messages &&
          messages.map((message, idx) => (
            <div
              key={idx}
              className={`message-container ${
                message.ownedByCurrentUser ? 'mine' : 'received'
              }`}
            >
              <div>
                {!message.ownedByCurrentUser && (
                  <span className="message-username">
                    {message.body.username}
                  </span>
                )}
                <span className="message-text">{message.body.message}</span>
              </div>
            </div>
          ))}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => {
            messagesEnd.current = el;
          }}
        ></div>
      </div>

      <div className="send-container">
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          value={message}
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => sendOnEnterDown(e)}
        ></textarea>

        <button
          onClick={() => sendHandler({ message, username })}
          disabled={!message}
        >
          <img src={sendIcon} alt="Send Icon" />{' '}
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
