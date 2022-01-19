import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 10px;
  background-color: #132738;
  font-size: 1.3rem;
`;

const Title = styled.div`
  margin-top: 12px;
  margin-bottom: 6px;
`;

const UsernameInput = styled.input`
  border: none;
  background: none;
  color: white;
  padding: 10px;
  width: 100%;
  background-color: #24425c;
  border-radius: 10px;
`;

const RoomBtnList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const RoomBtnItem = styled.li`
  min-width: 45%;
`;

const RoomBtn = styled.button`
  background: white;
  color: black;
  width: 100%;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;
  :disabled {
    opacity: 0.5;
  }
`;

const Rooms = () => {
  const [rooms] = useState([
    { name: 'Room1', id: '1' },
    { name: 'Room2', id: '2' },
  ]);

  const [userName, setUserName] = useState('');

  return (
    <div>
      <Header>Socket Chat</Header>

      <label htmlFor="">
        <Title>Username</Title>
        <UsernameInput
          type="text"
          value={userName}
          placeholder="Jon Doe"
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <Title>Rooms</Title>
      <RoomBtnList>
        {rooms &&
          rooms.map((room) => (
            <RoomBtnItem key={room.id}>
              <Link to={`/${room.name}/${userName}`}>
                <RoomBtn disabled={!userName}>{room.name}</RoomBtn>
              </Link>
            </RoomBtnItem>
          ))}
      </RoomBtnList>
    </div>
  );
};

export default Rooms;
