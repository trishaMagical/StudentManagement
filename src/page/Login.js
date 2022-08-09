import React, { useState } from 'react';

import "./Login.css";
import axios from 'axios';




const Login = () => {

  const [schoolname, setSchoolname] = useState("");
  const [password, setPassword] = useState("");
  // const[first_Name, setfirst_name]= useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5001/api/login/${schoolname}/${password}`)
      .then(res => {
        console.log(res.data[0].schoolname);
        console.log(res.data[0].firstname);
        localStorage.setItem("userInfo", JSON.stringify(res.data[0]));
        window.location = '/Classname';

      }).catch(err => {
        console.log(err);
      })

  }

  return (
    <div  style={{ marginTop: "100px" }}>
      <form  className='mainContainer' style={{
        margin: "auto",
        maxWidth: "400px",
        alignContent: "center"

      }}
        onSubmit={loginSubmit}>
        <label className='secondContainer'>Login</label> 
        <br/>
        <br/>
        <br/> 
        <input
          className='inputbox-Style'
          type="text"
          id="name"
          name="name"
          value={schoolname}
          onChange={(e) => setSchoolname(e.target.value)}
          placeholder="Schoolname"
        />
        <br/>
        <br/>
        <input
          className='inputbox-Style'
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br/>
        <br/>
        <br/>
        <input type="submit" value="Login" />
        <br/>
        <label>Need an account?</label>
        <a href='/'>
            <strong>
              <label className='signupTextstyle'>Sign Up</label>
            </strong>
        </a>

      </form>


    </div>
  )
}

export default Login