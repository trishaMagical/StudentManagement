import React, { Component, useState } from 'react'
import axios from "axios";
import "./Student.css"

export default class Todo extends Component {
    state = {
        input: "",
        inputage: "",
        data: [],
        // edit: false,
        // update: ""
    }
    //const [value, setValue] = useState();
    handleChange = (e) => {
        this.setState({ input: e.target.value });

    }
    handleChange2 = (e) => {
        this.setState({ inputage: e.target.value });

    }

    async componentDidMount() {

        const query = new URLSearchParams(this.props.location.search);
        let classname = query.get("classname")
        console.log("classname", classname);


        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);


        let post = await axios
            .get(`http://localhost:5001/allstudents/${data.schoolname}/${classname}`)

        console.log("Datapost", post.data);
        this.setState({ data: post.data })

    }

    addStudent = async () => {
        const query = new URLSearchParams(this.props.location.search);
        let classname = query.get("classname")
        console.log("classname", classname);


        console.log("Trisha", this.state.input);
        console.log("Trisha", this.state.inputage);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);


        axios
            .post(`http://localhost:5001/insertstudent/${data.schoolname}/${classname}`,
                {
                    studentname: this.state.input,
                    studentage: this.state.inputage
                },

                window.location = "Student?classname=" + classname
            )

    }
    edit = (id) => {
        console.log("id", id);
        this.setState({ edit: id })
    }

    editStudent = async (id) => {
        const query = new URLSearchParams(this.props.location.search);
        let classname = query.get("classname")
        console.log("classname", classname);
        console.log("Idddd", id);
        let data = [...this.state.data]
        let obj = data.find(s1 => s1.id === id)
        console.log("id", id);
        console.log("Trisha", this.state.input);
        const datavalue = JSON.parse(localStorage.getItem("userInfo"));
        console.log("datavalue", datavalue);

        axios
            .put(`http://localhost:5001/updatestudent/${id}/${datavalue.schoolname}`,
                {
                    studentname: obj.studentname,
                    studentage: obj.studentage,

                }

            )
        this.setState({ Index: -1 })
        window.location = "Student?classname=" + classname
    }

    handleEditnameChange = (e, id) => {
        let data = [...this.state.data]
        console.log("Dataabcdfjhgj", data);
        let ind = data.findIndex(s1 => s1.id === id)
        console.log("Index", ind, id);
        let obj = data[ind]
        obj["studentname"] = e.target.value
        console.log("OBJ", obj);
        data[ind] = obj
        this.setState({ data })
    }
    handleEditageChange = (e, id) => {
        let data = [...this.state.data]
        console.log("Dataabcdfjhgj", data);
        let ind = data.findIndex(s1 => s1.id === id)
        console.log("Index", ind, id);
        let obj = data[ind]
        obj["studentage"] = e.target.value
        console.log("OBJ1", obj);
        data[ind] = obj
        this.setState({ data })
    }
    editCancel = () => {
        const query = new URLSearchParams(this.props.location.search);
        let classname = query.get("classname")
        console.log("classname", classname);

        window.location = "Student?classname=" + classname
    }
    deleteStudent = async (id) => {
        const query = new URLSearchParams(this.props.location.search);
        let classname = query.get("classname")
        console.log("classname", classname);
        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);

        console.log("ABCDRtyxse", id);
        axios
            .get(`http://localhost:5001/deletestudent/${id}/${data.schoolname}`,

                window.location = "Student?classname=" + classname
            )

    }

    render() {
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
                                <a className="nav-link text-white" href="/Classname">Classname</a>
                            </li>
                            <li className="nav-item ms-auto">
                                <a className="nav-link text-white" href="/logout">Log Out</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div style={{ marginTop: "100px" }}>
                    <h1 className='labelContainer'>Student Name</h1>
                    
                    <div className='tableclass'>
                        <table className=" styled-table"  >
                            <thead className="headersStyling">
                                <tr>
                                    <th style={{ textAlign: "center" }}>StudentName</th>
                                    <th style={{ textAlign: "center" }}>StudentAge</th>
                                    <th style={{ textAlign: "center" }}>Actions</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((val, index) => {
                                        return (
                                            <tr >
                                                <td key={index}>
                                                {val.studentname}


                                                  
                                                   

                                                </td>

                                                <td key={index}>

                                                    {val.studentage}

                                                    
                                                </td>
                                                <td>
                                                    <button className="btn-edit" onClick={() => this.edit(val.id)}>Edit</button>


                                                    <button className="btn-delete" onClick={() => this.deleteStudent(val.id)}>Delete</button>

                                                </td>



                                            </tr>
                                        )



                                    })}


                            </tbody>
                        </table>
                    </div>

                </div>
            </>

        )
    }
}