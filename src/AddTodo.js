import React, { useState } from 'react';
import { Button, Grid, TextField } from "@mui/material";

const AddTodo = (props) => {
  // 사용자 입력 저장할 오브젝트
  const [item, setItem] = useState({title: ""});
  const addItem = props.addItem; // App.js에서 넘어온 App.js/addItem 함수

  // onButtonClick 함수
  const onButtonClick = () => {
    addItem(item); // App.js/addItem함수 호출
    setItem({title: ""});
  }
  // enterKeyEventHandler 함수
  const enterKeyEventHandler = (e) => {
    if(e.key === 'Enter') {
      onButtonClick();
    } 
  }
  // onInputChange 함수 
  const onInputChange = (e) => {
    setItem({title: e.target.value});
    // console.log(item);
  }

  // 렌더링 될 AddTodo JSX 코드
  // onInputChange 함수를 TextField에 연결
  // onButtonClick 함수를 Button에 연결
  return (
    <Grid container style={{marginTop:20}}>
      <Grid xs={11} md={11} item style={{paddingRight:16}}>
      <TextField placeholder="Add Todo here" fullWidth 
        onChange={onInputChange}
        onKeyDown={enterKeyEventHandler} 
        value={item.title}/>
      </Grid>
      <Grid xs={1} md={1} item>
        <Button fullWidth style={{height:'100%'}} color='secondary' 
          variant='outlined' onClick={onButtonClick}>
        +
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddTodo;