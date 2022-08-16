import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import "./SignUp.css"

import axios from 'axios';
import { toast } from "react-toastify";
// import { toToastItem } from 'react-toastify/dist/utils';

const initialState = {
    schoolname: "",
    address: ""

}
const SignUp = (props) => {
    const [state, setState] = useState(initialState);


    const [is_Update, setis_Update] = useState(false);

    const [ids, setIds] = useState("");

    const { schoolname, address, password } = state;

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {

        



    }, 0)

    const handleSubmit = async (e) => {
        console.log("Hi");
        console.log(schoolname, address);
        e.preventDefault();
        if (!schoolname || !address || !password) {
            toast.error("Please fill the form");

        } else {
            console.log("Hi2", is_Update);
            if (is_Update === false) {

                await axios.post("http://localhost:5001/addNewlogin",
                    state
                ).then(() => {
                    setState({ schoolname: "", address: "", password: ""})

                }).catch((err) => toast.error(err.response.data))
                window.location ="/Classform"
            } 
        }
    }

    const handleInputChangeforName = (e) => {
        const temp = { ...state }
        temp.schoolname = e.target.value;
        setState(temp);
    }

    const handleInputChangeforAddress = (e) => {
        const temp = { ...state }
        temp.address = e.target.value;
        setState(temp);
    }
    const handleInputChangeforPassword = (e) => {
        const temp = { ...state }
        temp.password = e.target.value;
        setState(temp);
    }

    return (

        <div style={{ marginTop: "100px" }}>

            <form className='mainContainer'  onSubmit={handleSubmit}>
                <div>
                    <label className='secondContainer'>Enlisted School</label>
                </div>
                <br />
                <br />

                <input
                    className='inputbox-Style'
                    type="text"
                    id="name"
                    name="name"
                    placeholder="School Name"
                    value={schoolname || ""}
                    onChange={handleInputChangeforName}
                />
                <br />
                <br />
                <input
                    className='inputbox-Style'
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Address"
                    value={address || ""}
                    onChange={handleInputChangeforAddress}
                />
                <br />
                <br />
                <input
                    className='inputbox-Style'
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password || ""}
                    onChange={handleInputChangeforPassword}
                />
                <br />
                <br />
               
                <input type="submit" value="Submit" />
                <br/>
                <label className='alreadyStyle'>Already a Enlisted?</label>
                    <a href='/login'>
                        <strong>
                            <label className='loginText'>School Login</label>
                        </strong>

                    </a>
            </form>

        </div>
    )
}

export default SignUp