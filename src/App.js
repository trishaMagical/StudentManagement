import { BrowserRouter, Switch, Route, Redirect, withRouter  } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import classname from "./page/classname";
import Studentname from "./page/Studentname";
import Classform from "./page/Classform";
import EditClassform from "./page/EditClassform";
import Studentform from "./page/Studentform";
import EditStudentform from "./page/EditStudentform"

function App() {

  return (
    <BrowserRouter>
      <div className="App">

      
          
        <Switch>
         
          <Route exact path="/" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/classname" component={classname} />
          <Route exact path="/Classform" component={Classform} />
          <Route exact path="/EditClassform" component={EditClassform} />
          <Route exact path="/Studentform" component={Studentform} />
          <Route exact path="/Studentname" component={Studentname} />
          <Route exact path="/EditStudentform" component={EditStudentform} />
          <Route exact path="/logout" component={Login} />



          <Redirect to="/SignUp" />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
