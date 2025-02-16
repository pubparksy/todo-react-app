import './App.css';
import Todo from './Todo';
import React, {useState,useEffect} from 'react';
import { Container, List, Paper } from "@mui/material";
import AddTodo from './AddTodo';
import { call } from "./service/ApiService";

function App() {
  // const [items, setItems] = useState([
  //   { id:'0', title:'Hello World 1', done: true, },
  //   { id:'1', title:'Hello World 2', done: true, },
  // ]);
  const [items, setItems] = useState([]);

  // AS-IS
  // useEffect(()=>{
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {"Content-Type": "application/json"},
  //   };

  //   fetch("http://localhost:8080/todo", requestOptions)
  //   .then((response)=> response.json())
  //   .then((response) => { setItems(response.data); },
  //     (error) => {},
  //   ); 
  // }, []);

  // TO-BE (ApiService)
  useEffect(() => { 
    call("/todo", "GET", null) 
    .then((response) => setItems(response.data));
  }, []);

  const addItem = (item) => { 
    call("/todo", "POST", item) 
    .then((response) => setItems(response.data));
  };
  const deleteItem = (item) => { 
    call("/todo", "DELETE", item) 
    .then((response) => setItems(response.data));
  };

  // AS-IS
  // const editItem = () => { // 매개변수X
  //   setItems([...items]);
  // }
  // TO-BE
  const editItem = (item) => { // 매개변수O
    call("/todo", "PUT", item)
    .then((response) => setItems(response.data));
  }


  let todoItems = 
    items.length > 0 && (
      <Paper style={{margin:16}} >
        <List>
          {items.map((item)=> (
            <Todo item={item} key={item.id}
              editItem={editItem} 
              deleteItem={deleteItem}
            />
          ))}
        </List>
      </Paper>
    );

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo addItem={addItem}/>
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
