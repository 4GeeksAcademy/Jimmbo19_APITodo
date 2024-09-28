import React, { useState, useEffect  } from 'react';

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

    useEffect(()=>{getItems();},[]);
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            postItem();
        }
    };

    const deleteItem = (id) => {
        console.log('eliminaste' + id )
        fetch(`https://playground.4geeks.com/todo/todos/Jaimelista/${id}`, {
              method: "DELETE",
                redirect: "follow"
        })
        .then((response) => response.text())
        .then((data) => {
            
            setTodos(prevTodos => prevTodos.filter((todo,index) => index !== id)); 
        })
        .catch((error) => console.error(error));
    };


    return (
        <>

        <div className=" container text-center margin=3">
             <h1 className="display-2 lead">TODOS</h1>
                <div>
                        <input type="text"   className="form-control list-inline"
                        onChange={e => setInputValue(e.target.value)} 
                        onKeyDown={handleKeyDown}
                        value={inputValue} 
                        placeholder="What needs to be done?"
                        ></input>
                </div>
            <ul className="list-group">
                {todos.length > 0 ? (
                    todos.map((todo, index) => (
                        <li className="list-group-item shadow p-3  bg-body-tertiary rounded d-flex justify-content-between" key={index}>{todo.label}  
                        <button type="button" className="btn-close " aria-label="Close"  onClick={() => deleteItem(index)}></button></li> 
                    ))
                ) : (
                    <li className="list-group-item"></li>
                )}
                
            </ul>
            <li className="list-footer-item shadow p-1  bg-body-tertiary rounded d-flex justify-content-between">
                <span>{todos.length} items left</span></li>
            </div>
        </>
    );
};

export default Prueba;
