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
        setTodos0(prevTodos => [...prevTodos, inputValue])
           
        setInputValue('')

        .catch(error => console.error('Error posting data:', error));
    };

    return (
        <>
            <h1>HOLA</h1>
            <button onClick={getItems}>Get</button>
            <button onClick={postItem}>Post</button>
            <input type="text" 
            onKeyDown={postItem} 
            onChange={e => setInputValue(e.target.value)} 
            value={inputValue} ></input>
            <ul>
                {todos.length > 0 ? (
                    todos.map((todo, index) => (
                        <li key={index}>{todo.label}</li> 
                    ))
                ) : (
                    <li>No hay tareas disponibles</li>
                )}
            </ul>
        </>
    );
};

export default Prueba;
