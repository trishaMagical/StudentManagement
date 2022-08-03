
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
            .get(`http://localhost:5001/allclass/${data.email}`)

        console.log("post", post.data);
        this.setState({ data: post.data })

    }
    addCategory = async () => {
        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);

        axios
            .post(`http://localhost:5001/insertclasstable/${data.email}`,
                { classname: this.state.input },
                window.location = "/classname"
            )


    }
    edit = (id) => {
        console.log("id", id);
        this.setState({ edit: id })
    }
    handleEditChange = (e, id) => {
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
    editCategory = async (id) => {
        console.log("Idddd", id);
        let data = [...this.state.data]
        let obj = data.find(s1 => s1.id === id)
        console.log("id", id);

        console.log("Trisha", this.state.input);
        const datavalue = JSON.parse(localStorage.getItem("userInfo"));
        console.log("datavalue", datavalue);

        axios
            .put(`http://localhost:5001/updateclass/${id}/${datavalue.email}`,
                { classname: obj.classname }

            )
        this.setState({ Index: -1 })
        window.location = "/classname"
    }
    deleteCategory = async (classname) => {
        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);

        console.log("ABCDRtyxse", classname);
        axios
            .get(`http://localhost:5001/deleteclass/${data.email}/${classname}`,

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
                            {/* <li className="nav-item active">
                        <a className="nav-link text-white" href="/Home">Profile </a>
                    </li> */}
                            <li className="nav-item ">
                                <a className="nav-link text-white" href="/Classname">Classname</a>
                            </li>
                            <li className="nav-item ms-auto">
                                <a className="nav-link text-white" href="/logout">Log Out</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div>
                    <h1>Add Classtable</h1>
                    <input
                        placeholder="Add classes"
                        name="text"
                        className="todo-input"

                        onChange={this.handleChange}
                        value={this.state.input}
                    />
                    <button  onClick={this.addCategory} className="addbuttonStyle">
                        Add Classname
                    </button>
                    <div>
                        {this.state.data.map((val, index) =>
                            <div className='mt-2'>
                                <div style={index%2==0?{backgroundColor:"lightseaGreen"}:{backgroundColor:"lightYellow"}}  className='row pt-1' key={index}  >
                                    <div className='col-2'></div>
                                    <div className='col-1'>
                                        <strong>
                                        <span style={{fontSize:'25px',marginRight:'-300px'}}>{val.classname}</span> 

                                        </strong>
                                       
                                    </div>
                                    <div className='col-3'  style={{alignItems:'center',marginRight:'-100px' }}>
                                        <button className='editbuttonStyle' onClick={() => this.edit(val.id)}>Edit</button>

                                    </div>
                                    <div className='col-3'style={{alignItems:'center', marginLeft:'-150px'}} >
                                        <button className='deletebuttonStyle' onClick={() => this.deleteCategory(val.classname)}>Delete</button>
                                    </div>
                                    <div className='col-3' style={{alignItems:'center', marginLeft:'-210px'}} >
                                        <a href={"/Todo?classname=" + val.classname}  >
                                            <button class='studentpagebuttonStyle'>StudentPage</button>
                                        </a>

                                    </div>
                                </div>
                                {
                                    val.id === this.state.edit ?
                                        <div>
                                            <input
                                                value={val.classname}
                                                placeholder="Update a Classname"
                                                name="text"
                                                className="todo-input"
                                                onChange={(e) => this.handleEditChange(e, val.id)}

                                            />
                                            <div>
                                                <button onClick={() => this.editCategory(val.id)}>Save</button>
                                            </div>
                                        </div>


                                        :
                                        <div>
                                        </div>

                                }

                            </div>
                        )}
                    </div>

                </div>


            </>
        )
    }
}
