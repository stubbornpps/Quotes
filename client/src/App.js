import './App.css';
import Login from './components/sections/Login.js';
import Home from './components/sections/Home.js';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch,useParams} from "react-router-dom";
import ButterToast,{ POS_CENTER,POS_TOP } from "butter-toast";
import signup from './components/sections/signup';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Profile  from '../src/components/Profile/Profile';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { PrivateRoute , LogRoute } from './routes/PrivateRoute';
import  Header from './components/headers/Header';
import  Forgotpassword from './components/sections/Forgotpassword';
import Notfound from './components/Notfound/Notfound';
import View from './components/Quotes/View.js';
import Add from './components/Quotes/Add.js';
library.add(fab, faCheckSquare, faCoffee)

function App() {  
  return(    
    <>
    <ButterToast position={{vertical:POS_TOP,horizontal:POS_CENTER}} />
      <Router>        
      <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <LogRoute path='/login' exact component={Login} />
          <Route path='/signup' component={signup} ></Route>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />  
          <PrivateRoute exact path="/profile" component={Profile} />  
          <PrivateRoute exact path="/view" component={View} />  
          <PrivateRoute exact path="/add" component={Add} />  
          <PrivateRoute exact path="/edit/:id" component={Add} />  
          <LogRoute path='/forgotpassword' component={Forgotpassword} />
          <LogRoute path='/resetpassword/:token' component={Forgotpassword} />
          <Route component={Notfound} />
        </Switch>        
      </Router>
    </>
  );
}

export default App
