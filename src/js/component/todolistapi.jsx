import React, { useState, useEffect } from 'react';

const Todolist = () => {
 
  const addItem = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      postItem();
    }
  };
e
  const getItems = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/users/todoList');
      const data = await response.json();
      setItems(data); // Suponiendo que `data` es una lista de ítems
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  // Usar useEffect para obtener ítems al montar el componente
  useEffect(() => {
    getItems();
  }, []); // Dependencias vacías para que se ejecute solo una vez

  return (
   
    <div className=" container text-center margin=3">
    <h1 className="display-2 lead">TODOS</h1>
    <div>
        <input 
            type="text"  className="form-control list-inline"
            onKeyDown={addItem} 
            onChange={e => setInputValue(e.target.value)} 
            value={inputValue} 
            placeholder="What needs to be done?"
        />
    </div>
    <ul className="list-group">
        {items.map((item, index) => (
            <li  className="list-group-item shadow p-3  bg-body-tertiary rounded d-flex justify-content-between" key={index}  >
                {item}<button type="button" className="btn-close " aria-label="Close" onClick={()=>removeitem(index)}  ></button>
            
            </li>
      
        ))}
           <li className="list-footer-item shadow p-1  bg-body-tertiary rounded d-flex justify-content-between">
        <span>{items.length} items left</span>
       </li>
    </ul>

</div>
  );
};

export default Todolist;
