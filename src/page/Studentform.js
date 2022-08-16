import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import "./SignUp.css"

import axios from 'axios';
import { toast } from "react-toastify";
// import { toToastItem } from 'react-toastify/dist/utils';

const initialState = {
    studentname: "",
    studentage: "",
    classname:null,

}
const Studentform = (props) => {
    const [state, setState] = useState(initialState);


    const [is_Update, setis_Update] = useState(false);

    const [ids, setIds] = useState("");

    const { studentname, studentage} = state;

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        
        
        

    }, 0)

    const handleSubmit = async (e) => {
        console.log("Hi");
        const query = new URLSearchParams(props.location.search);
        let classname = query.get("classname")
        console.log("classname", classname);
       
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);
        e.preventDefault();
            if (is_Update === false) {

                await axios.post(`http://localhost:5001/insertstudent/${data.schoolname}/${classname}`,
                    state
                ).then(() => {
                    setState({ studentname: "", studentage: "" })


                }).catch((err) => toast.error(err.response.data))
                window.location = "/Studentname?classname="+ classname
            } 
        
    }
     
    const handleInputChangeforName = (e) => {
        const temp = { ...state }
        temp.studentname = e.target.value;
        setState(temp);
    }

    const handleInputChangeforStudentage = (e) => {
        const temp = { ...state }
        temp.studentage = e.target.value;
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
                            <a className="nav-link text-white" href="/Studentform">Studentform</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link text-white" href="/classname">classname</a>
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
                        <label className='secondContainer'>Form for Enlisted School</label>
                    </div>
                    <br />
                    <br />

                    <input
                        className='inputbox-Style'
                        type="text"
                        id="studentname"
                        name="studentname"
                        placeholder="Student Name"
                        value={studentname || ""}
                        onChange={handleInputChangeforName}
                    />
                    <br />
                    <br />
                    <input
                        className='inputbox-Style'
                        type="text"
                        id="studentage"
                        name="studentage"
                        placeholder="studentage"
                        value={studentage || ""}
                        onChange={handleInputChangeforStudentage}
                    />
                    <br />
                    <br />
                    
                  
                    <input type="submit" value="Submit" />
                    <br/>
                    
                    <br />
                   
                   
                </form>

            </div>
        </>


    )
}

export default Studentform