import React, { useState } from "react";
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton, } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

const Todo = (props) => {
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  // turnOffReadOnly 함수 작성 
  const turnOffReadOnly = () => { 
    setReadOnly(false);
    console.log("Off > readOnly : ", readOnly);
  }
  // turnOnReadOnly 함수 작성 
  const turnOnReadOnly = (e) => {
    // if (e.key === "Enter") {
    //   setReadOnly(true);
    // }
    if (e.key === "Enter" && readOnly === false) {
      setReadOnly(true);
      // API 호출로 바뀌면서 readOnly=true되는 수정 완료 시점에 App.js/editItem 함수 호출
      editItem(item);
    }
  }

  const deleteItem = props.deleteItem; // App에서 가져온 함수 그자체
  const deleteEventHandler = () => { // 삭제 이벤트 핸들러 함수
    deleteItem(item);
  }

  const editItem = props.editItem;
  const editEventHandler = (e) => { 
    // item.title = e.target.value;
    // editItem(); // App.js/editItem에 한글자 씩 넘어가서 1글자 씩 API가 호출되어버림
    setItem({...item, title: e.target.value});
  }; 

  const checkboxEventHandler = (e) => { 
    item.done = e.target.checked;
    // editItem();
    editItem(item); // API 호출 시, BE Data를 수정
  }

  return (
  <ListItem> 
    <Checkbox checked={item.done} onChange={checkboxEventHandler} />
    <ListItemText> 
      <InputBase 
        inputProps={{ "aria-label": "naked", readOnly: readOnly }}
        onClick={turnOffReadOnly}
        onKeyDown={turnOnReadOnly}
        onChange={editEventHandler} 
        type="text" 
        id={item.id} 
        name={item.id} 
        value={item.title} 
        multiline={true} 
        fullWidth={true} 
      /> 
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    );
};
export default Todo;