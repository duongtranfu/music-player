import logo from './logo.svg';
import './App.css';
import { Playlist } from './components';
import chillHop from './data';

const songs = chillHop();

function App() {
  return (
    <Playlist songs={songs} />
  );
}

export default App;
