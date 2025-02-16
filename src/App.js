import './App.css';
import Todo from './Todo';
import React, {useState} from 'react';
import { Container, List, Paper } from "@mui/material";
import AddTodo from './AddTodo';

function App() {
  // const [items, setItems] = useState([
  //   { id:'0', title:'Hello World 1', done: true, },
  //   { id:'1', title:'Hello World 2', done: true, },
  // ]);
  const [items, setItems] = useState([]);

  // 1. App 컴포넌트에 새로운 addItem 함수를 추가
  const addItem = (item) => { // 여기서 item = NEW TODO
    item.id = "ID-" + items.length; // key를 위한 id
    item.done = false; // done 초기화
    // AddItem해서 todoItems가 UPDATE되려면, 반드시 setItems로 새 배열을 만들어야한다.
    setItems([...items, item]); 
    // 1-1. 새로운 배열 []을 만든다. 기존의 items의 나머지 데이터에, 새로운 item을 넣는다.
    // 1-2. 그 새로운 배열을 App 컴포넌트의 setItems에 초기화한다.
    console.log("items : ", items); // 신규 추가 전의 기존 items 배열 출력
  }

  const editItem = () => {
    setItems([...items]);
  }

  const deleteItem = (item) => {
    // Event e로 넘어온 id가 기존 items와 다르면 새로운 배열에 담도록 filtering한다. 
    const newItems = items.filter(e => e.id !== item.id);
    // 삭제된 id item을 제외한 새로운 배열 items를 setItems에 새로운 배열로 초기화한다.
    setItems([...newItems]);
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
        {/* 2.App 컴포넌트의 하위 AddTodo 컴포넌트 매개변수에 addItem 함수 보내기 */}
        <AddTodo addItem={addItem}/> {/* 그러면 AddTodo 컴포넌트는 props.addItem로 받음 */} 
        <div className='TodoList'>{todoItems}</div>
      </Container>
    {/* 만약 items.length =< 0 라면 뭐가 되는거지? null인가? false인가? */}
    </div>
  );
}

export default App;
