import './App.css';
import io from 'socket.io-client';


function App() {
  const socket = io.connect('http://localhost:8080', {transports: ['websocket']});
  return (
    <div className="App">
      Hello World! I am Socialley.
    </div>
  );
}

export default App;
