import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import "./SignUp.css"

import axios from 'axios';
import { toast } from "react-toastify";
import classname from './classname';
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

    const { studentname, studentage } = state;

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        
        const query = new URLSearchParams(props.location.search);
        let id = query.get("id")
        console.log("ID", id);
        axios.get (`http://localhost:5001/studentdetails/${id}`) 
            
        .then (res =>{
            console.log("res",res.data[0]);
           const obj =
           {
           
            studentname :res.data[0].studentname, 
            studentage:res.data[0].studentage,
          
           }
          
            setState(obj,classname);
            setis_Update(true);
            console.log("Hello",res.data[0],state);
            console.log(res);
        })
        .catch(err => {
            console.log(err);

        })
  }, 0)
const navBarchange = (e) =>{
    const query = new URLSearchParams(props.location.search);
    let classname = query.get("classname")
    console.log("classname", classname); 
    window.location = "/Studentname?classname="+ classname 
}
    const handleSubmit = async (e) => {
        
        console.log("Hi");
        const query = new URLSearchParams(props.location.search);
        let classname = query.get("classname")
        console.log("classname", classname);
       
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);
        e.preventDefault();
       
        await axios.post(`http://localhost:5001/insertstudent/${data.schoolname}/${classname}`,
        state
    ).then(() => {
        setState({ studentname: "", studentage: "" })
            }).catch((err)=> toast.error(err.response.data))
           
            window.location = "/Studentname?classname="+ classname
            
            setTimeout(()=>{
                history.push("/")
                }, 500);
        
    
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
        <div className='headingClass'>
        
            <ul>
                    <li className='welcomClass'>Welcome</li>
                    <li><a href="/Classname">ClassTable</a></li>
                    <li className="buttonClass" onClick={navBarchange}>StudentTable</li>
                    <li><a href="/logout">LogOut</a></li>
                    
                </ul>
          
                
            </div>
            <div style={{ marginTop: "100px" }}>
                <form className='mainContainer' onSubmit={handleSubmit}>
                
                    <div>
                        <label className='secondContainer'>Edit Form</label>
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
                  

                    <input type="submit" value="Add" />
                    <br/>
                    {/* <a href={"/Studentname?classname="+ state.classname}>
                    <button className="btn-cancel">StudentTable</button>
                    </a> */}
                    
                    <br />

                </form>

            </div>
        </>


    )
}

export default Studentform