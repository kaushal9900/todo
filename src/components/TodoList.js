import React from 'react'
import Todo from './Todo'


const TodoList = ({todos,setTodos,filterTodos}) => {
    return (
        <div className="todo-container">
            <ul className="todo-list">
                {
                    filterTodos.map((e) => (
                        <Todo 
                            key={e.text} 
                            text={e.text} 
                            completed={e.completed}
                            setTodos={setTodos} 
                            todos={todos}
                            todo={e}
                        />                        
                    ))
                }
            </ul> 
        </div>
    )
}

export default TodoList;