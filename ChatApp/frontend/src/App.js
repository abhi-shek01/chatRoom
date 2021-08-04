import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import Home from './components/Home';



function App() {
  const [{ user }] = useStateValue();
  return (
    <div className="App">
      {!user ? (<Login />) :
        (
          <div className="app__body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>

                <Route path="/home">
                  <Home />
                </Route>

              </Switch>
            </Router>
          </div>

        )}

    </div>
  );
}

export default App;
