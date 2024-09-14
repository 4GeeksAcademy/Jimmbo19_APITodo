import React, { useState } from 'react';

const Prueba = () => {
    const [todos, setTodos] = useState([]);

    const getItems = () => {
        fetch('https://playground.4geeks.com/todo/users/JaimeLista')
            .then((response) => response.json())
            .then((data) => {
                console.log(data.todos); // Para verificar los datos
                setTodos(data.todos || []);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const postItem = () => {
        fetch('https://playground.4geeks.com/todo/todos/JaimeLista', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "label": "agrege esto desde react",
                "is_done": false
            })
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch(error => console.error('Error posting data:', error));
    };

    return (
        <>
            <h1>HOLA</h1>
            <button onClick={getItems}>Get</button>
            <button onClick={postItem}>Post</button>
            <ul>
                {todos.length > 0 ? (
                    todos.map((todo, index) => (
                        <li key={index}>{todo.label}</li> // Asumiendo que cada objeto tiene una propiedad 'label'
                    ))
                ) : (
                    <li>No hay tareas disponibles</li>
                )}
            </ul>
        </>
    );
};

export default Prueba;
