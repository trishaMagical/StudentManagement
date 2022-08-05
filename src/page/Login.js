import React, { useState } from 'react';

import "./Login.css";
import axios from 'axios';




const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const[first_Name, setfirst_name]= useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5001/api/login/${email}/${password}`)
      .then(res => {
        console.log(res.data[0].email);
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
          className='inputbox-Size'
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br/>
        <br/>
        <input
          className='inputbox-Size'
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
              <label className='signupTextstyle'> SignUp</label>
            </strong>
        </a>

      </form>


    </div>
  )
}

export default Login