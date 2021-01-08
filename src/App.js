import './App.css';
import Login from "./Componants/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Home from './Componants/UserPage';
import AdminPage from './Componants/AdminPage';


function App() {
  return (
    <Router>
    <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
    </Router>
    
  );
}

export default App;
