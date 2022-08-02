import React, { Component } from 'react'
import axios from "axios";
export default class Todo extends Component {
    state = {
        input: "",
        data: [],
        edit: -1,
        update: ""
    }
    handleChange = (e) => {
        this.setState({ input: e.target.value });

    }
    async componentDidMount() {

        const query = new URLSearchParams(this.props.location.search);
        let classname = query.get("classname")
        console.log("classname", classname);

      
        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);
        

        let post = await axios
            .get(`http://localhost:5001/allstudents/${data.email}/${classname}`)

        console.log("Datapost", post.data);
        this.setState({data:post.data})

    }

    addTodo = async () => {
        const query = new URLSearchParams(this.props.location.search);
        let classname = query.get("classname")
        console.log("classname", classname);

      
        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);
        

        axios
            .post(`http://localhost:5001/insertstudent/${data.email}/${classname}`,
                { studentname: this.state.input },
                window.location = "Todo?classname=" + classname

            )

    }
    edit = (id) => {
        console.log("id", id);
        this.setState({ edit: id })
    }

    editTodo = async (id) => {
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
            .put(`http://localhost:5001/updatestudent/${id}/${datavalue.email}`,
                { studentname: obj.studentname }

            )
        this.setState({ Index: -1 })
        window.location = "Todo?classname=" + classname
    }
   
    handleEditChange = (e, id) => {
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
    deleteTodo = async (id) => {
        const query = new URLSearchParams(this.props.location.search);
        let classname = query.get("classname")
        console.log("classname", classname);
        console.log("Trisha", this.state.input);
        const data = JSON.parse(localStorage.getItem("userInfo"));
        console.log("data", data);

        console.log("ABCDRtyxse", id);
        axios
            .get(`http://localhost:5001/deletestudent/${id}/${data.email}`,

                window.location = "Todo?classname=" + classname
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
            <div><h1>Student Name</h1>
                <input
                    placeholder="Add a student Name"
                    name="text"
                    className="todo-input"
                    value={this.state.input}
                    onChange={this.handleChange}
                />
                <button onClick={this.addTodo} className="todo-button">
                    Add Student
                </button>
                {
                        this.state.data.map((val, index) =>
                            <div key={index}>
                                {val.studentname}

                                <div>
                                    <button onClick={() => this.edit(val.id)}>Edit</button>
                                    {
                                        val.id === this.state.edit ?
                                            <div>
                                                <input
                                                    value={val.studentname}
                                                    placeholder="Update a student Name"
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
                                    <button onClick={() => this.deleteTodo(val.id)}>Delete</button>
                                </div>
                            </div>


                        )}



            </div>
            </>
            
        )
    }
}
