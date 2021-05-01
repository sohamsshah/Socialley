import { LandingPage } from "./pages";
import io from 'socket.io-client';

function App() {
  const socket = io.connect('http://localhost:8080', {transports: ['websocket']});
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
