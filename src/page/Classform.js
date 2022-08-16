import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import "./SignUp.css"

import axios from 'axios';
import { toast } from "react-toastify";
// import { toToastItem } from 'react-toastify/dist/utils';

const initialState = {
    classname: "",
    sec: "",
    teachersname: ""

}
const Classform = (props) => {
    const [state, setState] = useState(initialState);


    const [is_Update, setis_Update] = useState(false);

    const [ids, setIds] = useState("");

    const { classname, sec, teachersname } = state;

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        
        
            }, 0)

    const handleSubmit = async (e) => {
        console.log("Hi");
        console.log(classname, sec);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);
        e.preventDefault();
        if (!classname || !sec || !teachersname) {
            toast.error("Please fill the form");

        } else {
            console.log("Hi2", is_Update);
            if (is_Update === false) {

                await axios.post(`http://localhost:5001/insertclasstable/${data.schoolname}`,
                    state
                ).then(() => {
                    setState({ classname: "", sec: "", teachersname: "" })
                }).catch((err) => toast.error(err.response.data))

            } 
            setTimeout(() => {
                history.push("/")
            }, 500);
            window.location = '/classname'
        }
    }

    const handleInputChangeforName = (e) => {
        const temp = { ...state }
        temp.classname = e.target.value;
        setState(temp);
    }

    const handleInputChangeforSec = (e) => {
        const temp = { ...state }
        temp.sec = e.target.value;
        setState(temp);
    }
    const handleInputChangeforTeachersname = (e) => {
        const temp = { ...state }
        temp.teachersname = e.target.value;
        setState(temp);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-danger ">
                <a className="navbar-brand text-white" href="#">Welcome</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <a className="nav-link text-white" href="/Classform">ClassForm</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link text-white" href="/Classname">Classname</a>
                        </li>
                        <li className="nav-item ms-auto">
                            <a className="nav-link text-white" href="/logout">Log Out</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div style={{ marginTop: "100px" }}>

                <form className='mainContainer' onSubmit={handleSubmit}>
                    <div>
                        <label className='secondContainer'>Enlisted Class</label>
                    </div>
                    <br />
                    <br />

                    <input
                        className='inputbox-Style'
                        type="text"
                        id="classname"
                        name="classname"
                        placeholder="Class Name"
                        value={classname || ""}
                        onChange={handleInputChangeforName}
                    />
                    <br />
                    <br />
                    <input
                        className='inputbox-Style'
                        type="text"
                        id="sec"
                        name="sec"
                        placeholder="Sec"
                        value={sec || ""}
                        onChange={handleInputChangeforSec}
                    />
                    <br />
                    <br />
                    <input
                        className='inputbox-Style'
                        type="text"
                        id="teachersname"
                        name="teachersname"
                        placeholder="Teachersname"
                        value={teachersname || ""}
                        onChange={handleInputChangeforTeachersname}
                    />
                    <br />
                    <br />

                    <input type="submit" value="Submit" />
                    <br />

                </form>

            </div>
        </>


    )
}

export default Classform