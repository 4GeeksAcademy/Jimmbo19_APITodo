import React, { useState } from 'react';

const Prueba = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    
    const getItems = () => {
        fetch('https://playground.4geeks.com/todo/users/JaimeLista')
            .then((response) => response.json())
            .then((data) => {
                console.log(data.todos); 
                setTodos(data.todos || []);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const postItem = (e) => {
        fetch('https://playground.4geeks.com/todo/todos/JaimeLista', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "label": inputValue,
                "is_done": false
            })
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        setTodos(prevTodos => [...prevTodos, { label: inputValue, is_done: false }])
           
        setInputValue('')

        .catch(error => console.error('Error posting data:', error));
    };

    const deleteItem = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
              method: "DELETE",
                redirect: "follow"
        })
        .then((response) => response.text())
        .then((data) => {
            console.log(data); 
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id)); 
        })
        .catch((error) => console.error(error));
    };


    return (
        <>
            <h1>HOLA</h1>
            <button onClick={getItems}>Get</button>
            <button onClick={postItem}>Post</button>
            
            <input type="text"  
            onChange={e => setInputValue(e.target.value)} 
            value={inputValue} ></input>
            <ul>
                {todos.length > 0 ? (
                    todos.map((todo, index) => (
                        <li key={index}>{todo.label}  <button onClick={() => deleteItem(todo.id)}>Delete</button></li> 
                    ))
                ) : (
                    <li>No hay tareas disponibles</li>
                )}
            </ul>
        </>
    );
};

export default Prueba;
