import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


import classname from "./page/classname";
import Todo from "./page/Todo";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
      
       
        <Switch>
         
        <Route exact path="/classname" component={classname} />
        <Route exact path="/Todo" component={Todo} /> 
          
          
          
          
        <Redirect to="/classname" />  
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
