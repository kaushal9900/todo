import React from 'react'
import "../App.css";
import {toast} from "react-toastify";
const Form = ({setInput,todos,setTodos,input,setStatus,setFilterTodos}) => {    
    const submitTodoHandler = (e) => {
        e.preventDefault();
        if(input.length == 0) return toast.error("No Empty Name Allowed")
        var found = todos.filter(element => element.text === input);
        console.log(found);
        if(found.length > 0) {
            setInput("");
            setFilterTodos(todos);
            return toast.error("No Duplicate Allowed")
        }
        setTodos([
            ...todos,{text:input,completed:false}
        ]);
        toast.success(`${input} Has Been Created!`)
        setInput("");        
    }
    const handleStatus = (e) => {
            setStatus(e.target.value)
    }
    const handleSearch = (e) => {
        setInput(e.target.value)
        setFilterTodos(todos.filter(todo => todo.text === e.target.value))
        if(e.target.value < 1) {
            setFilterTodos(todos);
        }

    }
    return (        
        <div>
            <form>
                <input onChange={handleSearch} value={input} type="text" className="todo-input" />
                <button onClick={submitTodoHandler} className="todo-button" type="submit">
                    <i className="fas fa-plus-square"></i>
                </button>
                <div className="select">
                    <select onChange={handleStatus} name="todos" className="filter-todo">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>
            <div className="todo-container">
                <ul className="todo-list"></ul>
            </div>
        </div>
    )
}

export default Form;