
import React, { Component } from 'react'
import axios from "axios";
import "./classname.css";


export default class classname extends Component {
    state = {
        input: "",
        data: [],

    }
    handleChange = (e) => {
        this.setState({ input: e.target.value });

    }
    async componentDidMount() {
        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);

        let post = await axios
            .get(`http://localhost:5001/allclass/${data.schoolname}`)

        console.log("post", post.data);
        this.setState({ data: post.data })

    }



    edit = (id) => {
        console.log("id", id);
        this.setState({ edit: id })
    }



    deleteClassname = async (classname) => {
        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);

        console.log("ABCDRtyxse", classname);
        axios
            .get(`http://localhost:5001/deleteclass/${data.schoolname}/${classname}`,

                window.location = "/classname"
            )
    }
    render() {
        return (
            <>
                <div className='headingClass'>
                    <ul>
                        <li className='welcomClass'>Welcome</li>
                        <li><a href="/Classform">ClassForm</a></li>
                        <li><a href="/Classname">ClassTable</a></li>
                        <li><a href="/logout">LogOut</a></li>
                    </ul>
                </div>
                <div className="firstContainer">
                    <h1 className='labelContainer'>Class Table</h1>
                    <br />
                    <div className="tableclass">
                        <table className="styled-table" >
                            <thead className="headersStyling">

                                <tr >
                                    <th className='categorylabelStyle'>ClassName</th>
                                    <th className='categorylabelStyle'>Sec</th>
                                    <th className='categorylabelStyle'>Teacher'sName</th>
                                    <th style={{ textAlign: "center" }}>Actions</th>
                                </tr>

                            </thead>
                            <tbody >
                                {this.state.data.map((val, index) => {

                                    return (
                                        <tr >
                                            <td key={index}>
                                                <a className='categoryvalueStyle' href={"/Studentform?classname=" + val.classname}  >
                                                    {val.classname}
                                                </a>
                                            </td>
                                            <td key={index}>
                                                {val.sec}
                                            </td>
                                            <td key={index}>
                                                {val.teachersname}
                                            </td>
                                            <td>
                                                <a className='categoryvalueStyle' href={"/EditClassform?id=" + val.id}>
                                                    <button className="btn-edit" onClick={() => this.edit(val.id)}>Edit</button>
                                                </a>
                                                <button className="btn-delete" onClick={() => this.deleteClassname(val.classname)}>Delete</button>
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
