import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChatRoom from './pages/Rooms/ChatRoom';
import Rooms from './pages/Rooms/Rooms';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Rooms} />
        <Route exact path="/:roomId/:username" component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default App;
