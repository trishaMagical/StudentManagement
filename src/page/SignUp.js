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

    const { schoolname, address } = state;

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
                            schoolname: res.data[0].schoolname,
                            address: res.data[0].address,
                            
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
        console.log(schoolname, address);
        e.preventDefault();
        if (!schoolname || !address ) {
            toast.error("Please fill the form");

        } else {
            console.log("Hi2", is_Update);
            if (is_Update === false) {

                await axios.post("http://localhost:5001/addNewlogin",
                    state
                ).then(() => {
                    setState({ schoolname: "", address: ""})

                }).catch((err) => toast.error(err.response.data))

            } else {
                await axios.post(`http://localhost:5001/updateuser/${id}`,
                    state
                ).then(() => {
                    setState({ schoolname: "", address: ""})

                }).catch((err) => toast.error(err.response.data))

            }
            setTimeout(() => {
                history.push("/")
            }, 500);
        }
    }

    const handleInputChangeforName = (e) => {
        const temp = { ...state }
        temp.schoolname = e.target.value;
        //   const name=e.target.value;
        //     console.log("FirstName:",name);
        setState(temp);
    }

    const handleInputChangeforAddress = (e) => {
        const temp = { ...state }
        temp.address = e.target.value;
        // const job_role = e.target.value;
        // console.log("Job_Role", job_role);
        setState(temp);
    }
   

    return (

        <div style={{ marginTop: "100px" }}>

            <form className='mainContainer'  onSubmit={handleSubmit}>
                <div>
                    <label className='secondContainer'>FORM</label>
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
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email || ""}
                    onChange={handleInputChangeforAddress}
                />
                <br />
                <br />
               
               
                <input type="submit" value="SignUp" />
                <br/>
                <label className='alreadyStyle'>Already a member? </label>
                    <a href='/login'>
                        <strong>
                            <label className='loginText'>  Log In</label>
                        </strong>

                    </a>
            </form>

        </div>
    )
}

export default SignUp