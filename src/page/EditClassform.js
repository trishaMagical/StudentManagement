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
const EditClassform = (props) => {
    const [state, setState] = useState(initialState);


    const [is_Update, setis_Update] = useState(false);

    const [ids, setIds] = useState("");

    const { classname, sec, teachersname } = state;

    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        try {
            console.log("Hello", props.location.pathname);
            let path = props.location.pathname;
            let arr = path.split("/");
            console.log("arr", arr);

            if (arr.length === 3) {
                const id = arr[arr.length - 1];
                setIds(id);
                console.log("id", id);
                axios.get(`http://localhost:5001/api/get/${id}`)
                    .then(res => {
                        const obj =
                        {
                            classname: res.data[0].classname,
                            sec: res.data[0].sec,
                            teachersname: res.data[0].teachersname,

                        }
                        setState(obj);
                        setis_Update(true);
                        console.log("Hello", res.data[0], state);
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);

                    })




            }
            else {

            }
        }
        catch (ex) {
            console.log("exception", ex);
        }



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
            else{
                await axios.post(`http://localhost:5000/updateclass/${ids}/${data.schoolname}`, 
                {"classname":classname,"sec":sec,"teachersname":teachersname}
            ).then(()=>{
                
                alert("Succesfull");
                window.location="/classname"
                 setState({"classname":val.classname,"sec":val.sec,"teachersname":val.teachersname})
                
            }).catch((err)=> toast.error(err.response.data))
            
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
        //   const name=e.target.value;
        //     console.log("FirstName:",name);
        setState(temp);
    }

    const handleInputChangeforSec = (e) => {
        const temp = { ...state }
        temp.sec = e.target.value;
        // const job_role = e.target.value;
        // console.log("Job_Role", job_role);
        setState(temp);
    }
    const handleInputChangeforTeachersname = (e) => {
        const temp = { ...state }
        temp.teachersname = e.target.value;
        // const job_role = e.target.value;
        // console.log("Job_Role", job_role);
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
                        <label className='secondContainer'>Edit Form</label>
                    </div>
                    <br />
                    <br />

                    <input
                        className='inputbox-Style'
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Class Name"
                        value={classname || ""}
                        onChange={handleInputChangeforName}
                    />
                    <br />
                    <br />
                    <input
                        className='inputbox-Style'
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Sec"
                        value={sec || ""}
                        onChange={handleInputChangeforSec}
                    />
                    <br />
                    <br />
                    <input
                        className='inputbox-Style'
                        type="text"
                        id="name"
                        name="name"
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

export default EditClassform