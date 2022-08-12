
import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import "./classname.css";


export default class Category extends Component {
    state = {
        input: "",
        data: [],
        // edit: -1,
        // update:""
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
    // addCategory = async () => {
    //     console.log("Trisha", this.state.input);
    //     const data = JSON.parse(localStorage.getItem("userInfo"));
    //     console.log("data", data);

    //     axios
    //         .post(`http://localhost:5001/insertclasstable/${data.email}`,
    //             { classname: this.state.input },
    //             { sec: this.state.input },
    //             { teachersname: this.state.input },
    //             window.location = "/classname"
    //         )


    // }
    edit = (id) => {
        console.log("id", id);
        this.setState({ edit: id })
    }
    handleEditclassChange = (e, id) => {
        let data = [...this.state.data]
        console.log("Dataabcdfjhgj", data);
        let ind = data.findIndex(s1 => s1.id === id)
        console.log("Index", ind, id);
        let obj = data[ind]
        obj["classname"] = e.target.value
        console.log("OBJ", obj);
        data[ind] = obj
        this.setState({ data })
    }
    handleEditsecChange = (e, id) => {
        let data = [...this.state.data]
        console.log("Dataabcdfjhgj", data);
        let ind = data.findIndex(s1 => s1.id === id)
        console.log("Index", ind, id);
        let obj = data[ind]
        obj["sec"] = e.target.value
        console.log("OBJ", obj);
        data[ind] = obj
        this.setState({ data })
    }
    handleEditteachersnameChange = (e, id) => {
        let data = [...this.state.data]
        console.log("Dataabcdfjhgj", data);
        let ind = data.findIndex(s1 => s1.id === id)
        console.log("Index", ind, id);
        let obj = data[ind]
        obj["teachersname"] = e.target.value
        console.log("OBJ", obj);
        data[ind] = obj
        this.setState({ data })
    }
    editClassname = async (id) => {
        console.log("Idddd", id);
        let data = [...this.state.data]
        let obj = data.find(s1 => s1.id === id)
        console.log("id", id);

        console.log("Trisha", this.state.input);
        const datavalue = JSON.parse(localStorage.getItem("userInfo"));
        console.log("datavalue", datavalue);

        axios
            .put(`http://localhost:5001/updateclass/${id}/${datavalue.schoolname}`,
                { classname: obj.classname,
                    sec: obj.sec,
                    teachersname: obj.teachersname                
                },
            

            )
        this.setState({ Index: -1 })
        window.location = "/classname"
    }
    editCancel = ()=>{
        const query = new URLSearchParams(this.props.location.search);
        let category = query.get("category")
        console.log("categoryname", category);

        window.location = "/classname"
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
                <div className="firstContainer">
                    <h1 className='labelContainer'>Add Classtable</h1>
                    
                    <br/>
                    <br/>
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
                                            <a className='categoryvalueStyle' href={"/Student?classname=" + val.classname}  >
                                                {val.classname}
                                              
                                                </a>
                                                {
                                                    val.id === this.state.edit ?
                                                        <div>
                                                            <input
                                                                value={val.classname}
                                                                placeholder="Update a ClassName"
                                                                name="text"
                                                                className="todo-input"
                                                                onChange={(e) => this.handleEditclassChange(e, val.id)}

                                                            />
                                                            <br/>
                                                            <button className="btn-save" onClick={() => this.editClassname(val.id)}>Save</button>
                                                            <button className="btn-cancel" onClick={() => this.editCancel()}>Cancel</button>
                                                        </div>

                                                        :
                                                        <div>
                                                        </div>

                                                }
                                            </td>
                                            <td key={index}>
                                           
                                                {val.sec}
                                              
                                               
                                                {
                                                    val.id === this.state.edit ?
                                                        <div>
                                                            <input
                                                                value={val.sec}
                                                                placeholder="Update a ClassSec"
                                                                name="text"
                                                                className="todo-input"
                                                                onChange={(e) => this.handleEditsecChange(e, val.id)}

                                                            />
                                                            <br/>
                                                            <button className="btn-save" onClick={() => this.editClassname(val.id)}>Save</button>
                                                            <button className="btn-cancel" onClick={() => this.editCancel()}>Cancel</button>
                                                        </div>

                                                        :
                                                        <div>
                                                        </div>

                                                }
                                            </td>
                                            <td key={index}>
                                           
                                                {val.teachersname}
                                              
                                               
                                                {
                                                    val.id === this.state.edit ?
                                                        <div>
                                                            <input
                                                                value={val.teachersname}
                                                                placeholder="Update a teachersname"
                                                                name="text"
                                                                className="todo-input"
                                                                onChange={(e) => this.handleEditteachersnameChange(e, val.id)}

                                                            />
                                                            <br/>
                                                            <button className="btn-save" onClick={() => this.editClassname(val.id)}>Save</button>
                                                            <button className="btn-cancel" onClick={() => this.editCancel()}>Cancel</button>
                                                        </div>

                                                        :
                                                        <div>
                                                        </div>

                                                }
                                            </td>
                                            <td>
                                                <button className="btn-edit" onClick={() => this.edit(val.id)}>Edit</button>

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
