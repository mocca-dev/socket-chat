import { useState } from 'react';
import { Link } from 'react-router-dom';

const Rooms = () => {
  const [rooms] = useState([
    { name: 'Room1', id: '1' },
    { name: 'Room2', id: '2' },
  ]);

  const [userName, setUserName] = useState('');

  return (
    <div>
      <label htmlFor="">
        <h3>Username</h3>
        <input
          type="text"
          value={userName}
          placeholder="Enter a username"
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <h3>Rooms</h3>
      <ul>
        {rooms &&
          rooms.map((room) => (
            <li key={room.id}>
              <Link to={`/${room.name}/${userName}`}>
                <button disabled={!userName}>{room.name}</button>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Rooms;
