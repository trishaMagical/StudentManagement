import React, { Component, useState } from 'react'
import axios from "axios";
import "./Student.css"

export default class Todo extends Component {
    state = {
        input: "",
        inputage: "",
        data: [],
        classname: null,
    }
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
        this.setState({ data: post.data, classname })

    }

    navBarchange = () => {
        const query = new URLSearchParams(this.props.location.search);
        let classname = query.get("classname")
        console.log("classname", classname);
        window.location = "/Studentform?classname=" + classname
    }
    edit = (id) => {
        console.log("id", id);
        this.setState({ edit: id })

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

                window.location = "Studentname?classname=" + classname
            )

    }

    render() {
        return (
            <>
                <div className='headingClass'>

                    <ul>
                        <li className='welcomClass'>Welcome</li>
                        <li><a href="/Classname">ClassTable</a></li>
                        <li className="buttonClass" onClick={() => this.navBarchange()}>StudetForm</li>
                        <li><a href="/logout">LogOut</a></li>

                    </ul>


                </div>
                <div style={{ marginTop: "100px" }}>
                    <h1 className='labelContainer'>Student Table</h1>


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
                                                    <a className='categoryvalueStyle' href={"/EditStudentform?id=" + val.id + "&classname=" + this.state.classname} >
                                                        <button className="btn-edit" onClick={() => this.edit(val.id)}>Edit</button>
                                                    </a>
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