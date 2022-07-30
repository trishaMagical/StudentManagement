import React, { Component } from 'react'
import axios from "axios";
export default class classname extends Component {
    state = {
        input: "",
        data: [],
        //  edit: -1,
        // update:""
    }
    handleChange = (e) => {
        this.setState({ input: e.target.value });

    }
    async componentDidMount() {



        let post = await axios
            .get(`http://localhost:5001/allclassname`)
        console.log("Post", post.data);
        this.setState(post.data)



    }
    addClassname = async () => {
        console.log("Trisha", this.state.input);

        axios
            .post(`http://localhost:5001/addclassname`,
                { class: this.state.input },
                window.location = "/classname"
            )


    }
    edit = (id) => {
        console.log("id", id);
        this.setState({ edit: id })
    }

    editCategory = async (id) => {
        console.log("Idddd", id);
        let data = [...this.state.data]
        let obj = data.find(s1 => s1.id === id)
        console.log("id", id);

        axios
            .put(`http://localhost:5001/updateclass/${id}`,
                { class: obj.class }

            )
        this.setState({ Index: -1 })
        window.location = "/classname"
    }
    handleEditChange = (e, id) => {
        let data = [...this.state.data]
        console.log("Dataabcdfjhgj", data);
        let ind = data.findIndex(s1 => s1.id === id)
        console.log("Index", ind, id);
        let obj = data[ind]
        obj["todotext"] = e.target.value
        console.log("OBJ", obj);
        data[ind] = obj
        this.setState({ data })
    }
    deleteTodo = async (id) => {


        console.log("ABCDRtyxse", id);
        axios
            .get(`http://localhost:5001/deleteclass/${id}`,

                window.location = "/classname"
            )

    }
    render() {
        return (
            <>
                <h1>What's the className?</h1>
                <input
                    placeholder="Add a class"
                    name="number"
                    className="todo-input"

                    onChange={this.handleChange}
                    value={this.state.input}
                />
                <button onClick={this.addClassname} className="todo-button">
                    Add Class
                </button>
                {
                    this.state.data.map((val, index) =>
                        <div key={index}>
                            {val.class}

                            <div>
                                <button onClick={() => this.edit(val.id)}>Edit</button>
                                {
                                    val.id === this.state.edit ?
                                        <div>
                                            <input
                                                value={val.todotext}
                                                placeholder="Update a class"
                                                name="text"
                                                className="todo-input"
                                                onChange={(e) => this.handleEditChange(e, val.id)}

                                            />
                                            <button onClick={() => this.editTodo(val.id)}>Save</button>
                                        </div>

                                        :
                                        <div>
                                        </div>

                                }

                            </div>

                            <div>
                                <button onClick={() => this.deleteTodo(val.class)}>Delete</button>
                            </div>
                            <Link to={"/Todo?class=" + val.class}  >
                                <button >Go To Student</button>
                            </Link>
                        </div>


                    )}
            </>


        )
    }
}
