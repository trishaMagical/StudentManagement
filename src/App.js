import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SignUp from "./page/SignUp";
import Registration from "./page/Registration";
import Login from "./page/Login";
import classname from "./page/classname";
import Todo from "./page/Todo";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
      
       
        <Switch>
        <Route exact path="/" component={Registration} />
        <Route exact path="/SignUp" component ={SignUp} />
        <Route exact path="/classname" component={classname} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Todo" component={Todo} /> 
        <Route exact path="/logout" component={Login} />  
          
          
          
        <Redirect to="/" />  
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
