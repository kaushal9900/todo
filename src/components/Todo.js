import React,{useState} from 'react'
import {TiTickOutline,TiEdit} from 'react-icons/ti'
import {RiCloseCircleLine} from 'react-icons/ri'
import {FcCancel} from "react-icons/fc"
import {Button} from "antd";
import { toast } from 'react-toastify';
import "../App.css";
const Todo = ({text,todo,todos,setTodos}) => {
    const [edit,setEdit] = useState("")
    const [toggle,setToggle] = useState(false);
    const deleteHandler = () => {
        setTodos(todos.filter((element) => element.text !== todo.text))
        toast.error(`${text} has been deleted!`)
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        setToggle(true);
        setEdit(todo.text);
    }
    const completeHandler = () => {

        setTodos(todos.map((element) => {
            if(element.text===todo.text) {
                return {
                    ...element,completed: !element.completed
                }
            }
            return element;
        }))
    }
    const cancelUpdate = () => {
        setEdit("");
        setToggle(false);
    }
    const completeUpdate = () => {
        if(edit.length === 0) {
            setEdit(todo.text);
            return toast.error("Name cant be empty");
        }
        var found = todos.filter(element => element.text === edit);
        if(found.length > 0) {
            setEdit(todo.text);
            return toast.error("No Duplicates Allowed!");
        }
        setTodos(todos.map((element) => {
            if(element.text===todo.text) {
                return {
                    ...element,text:edit
                }
            }
            return element;
        }))
        setToggle(false);
    }
    return ( 
        
        <div className="todo">
            {
                toggle ? <>
                    <input type="text" value={edit} className="todo-item text-s-input" onChange={(e) => setEdit(e.target.value)}/>
                <Button 
                    disabled={todo.completed} 
                    type="primary" size='large' 
                    style={{background:'grey',borderColor:'grey',float:'right'}}
                    onClick={completeUpdate}
                >
                    <TiEdit />
                </Button>
                <Button
                    type="primary" size="large"
                    style={{background:'white'}}
                    onClick={cancelUpdate}
                >
                   <FcCancel />
                </Button>
            </> : <>
                <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{text}</li>
                <Button disabled={todo.completed} onClick={completeHandler} size='large' type="primary">
                    <TiTickOutline/>
                </Button>
                <Button  onClick={() => {
                    const confirmBox = window.confirm(`Are u sure u want to delete ${text} todo`)
                    if(confirmBox===true) {
                        deleteHandler()
                    }
                }} size='large' type="primary" danger>
                    <RiCloseCircleLine />
                </Button>
                <Button 
                    disabled={todo.completed} 
                    type="primary" size='large' 
                    style={{background:'grey',borderColor:'grey'}}
                    onClick={handleUpdate}
                >
                    <TiEdit />
                </Button>
            </>
            }
            
        </div>
        
    )
}

export default Todo;