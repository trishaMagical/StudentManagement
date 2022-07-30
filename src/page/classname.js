
import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'


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


        let post = await axios
            .get(`http://localhost:5001/allclass`)

        console.log("post", post.data);
        this.setState({ data: post.data })

    }
    addCategory = async () => {

        axios
            .post(`http://localhost:5001/insertclasstable`,
                { category: this.state.input },
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
        axios
            .put(`http://localhost:5001/updateclass/${id}`,
                { classname: obj.classname }

            )
        this.setState({ Index: -1 })
        window.location = "/classname"
    }
    deleteCategory = async (id) => {

        console.log("ABCDRtyxse", id);
        axios
            .get(`http://localhost:5001/deleteclass/${id}`,

                window.location = "/classname"
            )
    }
    render() {
        return (
            <div><h1>Add Classtable</h1>
                <input
                    placeholder="Add classes"
                    name="text"
                    className="todo-input"

                    onChange={this.handleChange}
                    value={this.state.input}
                />
                <button onClick={this.addCategory} className="todo-button">
                    Add Category
                </button>

                {this.state.data.map((val, index) =>
                    <div key={index}>

                        {val.classname}

                        <div>
                            <button onClick={() => this.edit(val.id)}>Edit</button>
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
                                        <button onClick={() => this.editCategory(val.id)}>Save</button>
                                    </div>

                                    :
                                    <div>
                                    </div>

                            }

                        </div>
                        <div>
                            <button onClick={() => this.deleteCategory(val.id)}>Delete</button>
                        </div>
                        <div>


                        <Link to={"/Todo?classname=" + val.classname}  >
                                <button>Go To StudentPage</button>
                            </Link>

                        </div>
                    </div>

                )}
            </div>
        )
    }
}
