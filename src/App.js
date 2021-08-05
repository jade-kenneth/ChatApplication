  import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
  import Auth from './ChatApplication/client/Auth/Auth';
import Chat from './ChatApplication/client/Chat/Chat';
import { UserContextProvider } from './ChatApplication/client/Context/UserContext';
// import { UserContextProvider } from './ChatApplication/client/context/UserContext';
  
  function App() {
    return (
      
      <Router>
        <UserContextProvider>
          <Switch>
            <Route exact path="/" component={Auth}/>
            <Route path="/app/chat" component={Chat}/>
          </Switch>
          </UserContextProvider>
      </Router>
    );
  }

  export default App;
