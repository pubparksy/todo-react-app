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
    if (e.key === "Enter") {
      setReadOnly(true);
      console.log("On > readOnly : ", readOnly);
    }
  }
  // console.log("readOnly : ", readOnly);

  const deleteItem = props.deleteItem; // App에서 가져온 함수 그자체
  const deleteEventHandler = () => { // 삭제 이벤트 핸들러 함수
    deleteItem(item);
  }

  const editItem = props.editItem;
  const editEventHandler = (e) => { 
    item.title = e.target.value;
    editItem();
  }; 

  const checkboxEventHandler = (e) => { 
    item.done = e.target.checked;
    editItem();
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