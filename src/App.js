import './App.css';
import StartPage from './main/startpage';
import LoginPage from './main/loginpage';
import SignupPage from './main/signuppage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainPage from './main/mainpage';
import Settings from './main/Settings';
import DetailsPage from './main/Details';

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path='/' component={StartPage}></Route>
        <Route exact path='/login' component={LoginPage}></Route>
        <Route exact path='/signup' component={SignupPage}></Route>
        <Route exact path='/browse' component={MainPage}></Route>
        <Route exact path='/usersettings' component={Settings}></Route>
        <Route exact path='/:id' component={DetailsPage}></Route>
      </Switch>
    </Router>

  );
}

export default App;