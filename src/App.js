import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


import classname from "./page/classname";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
      
       
        <Switch>
         
        <Route exact path="/classname" component={classname} />
          
          
          
          
          
        <Redirect to="/classname" />  
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
