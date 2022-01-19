import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useChat from '../../hooks/useChat';
import sendIcon from './send-icon.png';
import styled from 'styled-components';

const ChatRoomContainer = styled.div`
  margin: 0 auto;
  margin-top: 58px;
`;

const HomeBtn = styled.div`
  height: 16px;
  border: none;
  background: none;
  font-size: 1.1rem;
  margin-right: 10px;
  padding: 0 10px 0 10px;
`;

const ChatRoomHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  background: #132738;
  margin: 0;
  margin-bottom: 10px;
  padding: 14px 0;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
`;

const MessagesContainer = styled.div`
  margin-bottom: 15px;
  overflow: scroll;
  height: calc(100vh - 114px);
`;

const MessageContainer = styled.div`
  display: flex;
  max-width: 75%;
  min-width: 150px;
  padding: 5px 10px;
  margin: 5px 0;
  border-radius: 5px;
  &.mine {
    justify-content: flex-end;
    text-align: right;
    background-color: #547794;
  }
  &.received {
    background-color: #273f53;
  }
`;

const LeftArrow = styled.img`
  filter: invert(100%);
`;

const MessageUsername = styled.span`
  display: block;
  font-weight: bold;
`;

const SendContainer = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  bottom: 0;
  left: 0;
  border-top: 1px solid rgba(84, 119, 148, 0.5);
`;

const SendTextarea = styled.textarea`
  width: 100%;
  height: 53px;
  background: none;
  border: none;
  font-size: 1rem;
  color: var(--primary-fg-color);
  padding: 8px 13px;
  outline: none;
`;

const SendBtn = styled.button`
  background: none;
  border: none;
  width: 48px;
  img {
    height: 23px;
    filter: invert(100%);
    opacity: 0.6;
    margin-right: 10px;
  }
  :disabled img {
    opacity: 0.4;
  }
`;

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
    <ChatRoomContainer>
      <ChatRoomHeader>
        <Link to="/">
          <HomeBtn>
            <LeftArrow
              className="right-arrow"
              src="/left-arrow.svg"
              alt="back"
              height="16px"
            />
          </HomeBtn>
        </Link>
        {roomId}
      </ChatRoomHeader>
      <MessagesContainer>
        {messages &&
          messages.map((message, idx) => (
            <MessageContainer
              key={idx}
              className={message.ownedByCurrentUser ? 'mine' : 'received'}
            >
              <div>
                {!message.ownedByCurrentUser && (
                  <MessageUsername>{message.body.username}</MessageUsername>
                )}
                <span>{message.body.message}</span>
              </div>
            </MessageContainer>
          ))}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => {
            messagesEnd.current = el;
          }}
        ></div>
      </MessagesContainer>

      <SendContainer>
        <SendTextarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          value={message}
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => sendOnEnterDown(e)}
        ></SendTextarea>

        <SendBtn
          onClick={() => sendHandler({ message, username })}
          disabled={!message}
        >
          <img src={sendIcon} alt="Send Icon" />{' '}
        </SendBtn>
      </SendContainer>
    </ChatRoomContainer>
  );
};

export default ChatRoom;
