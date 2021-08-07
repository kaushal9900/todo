import React,{useState,useEffect} from 'react'
import './App.css';
import 'antd/dist/antd.css';
import Form from "./components/Form";
import TodoList from './components/TodoList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {  
  const [input,setInput] = useState("");
  const [todos,setTodos] = useState([]);
  const [status,setStatus] = useState("all");
  const [filterTodos,setFilterTodos] = useState([]);
  useEffect(()=> {
    getFromLocal();
  },[])
  useEffect(() => {
    saveLocal();
    filterHandler();
  },[todos,status])
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilterTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilterTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilterTodos(todos)
        break;
    }
  }
  const saveLocal = () => {
      localStorage.setItem('todos',JSON.stringify(todos));    
  }
  const getFromLocal = () => {
    if(localStorage.getItem("todos")===null) {
      localStorage.setItem("todos",JSON.stringify([]))
    }else {
      var localtodo = JSON.parse(localStorage.getItem("todos"))
      setTodos(localtodo);
    }
  }
  return (
    <div className="App">
      <ToastContainer />
      <div className="header1">
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5d/GNOME_Todo_icon_2019.svg" />
      <h1>Todo List</h1></div>
      <Form  
        setInput={setInput}
        todos={todos}
        setTodos={setTodos}
        input={input}
        setStatus={setStatus}
        setFilterTodos={setFilterTodos}
      />
      <TodoList setTodos={setTodos} todos={todos} filterTodos={filterTodos}/>
    </div>
  );
}

export default App;
