import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "리액트입문",
      contents: "리액트 기초강의 듣기",
      isDone: false,
    },
    {
      id: 2,
      title: "리액트심화",
      contents: "리액트 심화강의 듣기",
      isDone: true,
    },
  ]);

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  //제목 변경
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  //내용변경
  const contentsChangeHandler = (event) => {
    setContents(event.target.value);
  };

  //추가버튼 클릭
  const clickAddButtonHandler = () => {
    //새로운 todo생성
    const newTodo = {
      id: todos.length + 1,
      title: title,
      contents: contents,
      isDone: false,
    };
    setTodos([...todos, newTodo]);

    //버튼클릭 후 인풋창 비우기
    setTitle("");
    setContents("");
  };

  //삭제버튼 클릭(x)
  const clickRemoveButtonHandler = (id) => {
    const newTodos = todos.filter(function (todo) {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };

  //완료취소버튼 클릭
  const clickDoneButtonHandler = (id) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isDone: !item.isDone,
        };
      }
      return item;
    });

    setTodos(updatedTodos);
  };

  return (
    <div className="layout">
      <div className="container">
        <div>📌My Todo List📌</div>
        <div>React</div>
      </div>

      <div className="input">
        <label className="label">제목&nbsp;{""}</label>
        <input
          className="input-box"
          value={title}
          onChange={titleChangeHandler}
        />
        <br />
        <label className="label">내용&nbsp;{""}</label>
        <input
          className="input-box"
          value={contents}
          onChange={contentsChangeHandler}
        />
        <br />
        <button className="addbtn" onClick={clickAddButtonHandler}>
          추가하기
        </button>
      </div>

      <div className="list-container">
        <h2 className="list-title">Working.. 🔥</h2>
        <div className="working">
          {todos
            .filter((item) => !item.isDone)
            .map((item) => (
              <div key={item.id}>
                <Todo
                  item={item}
                  completeFunction={clickDoneButtonHandler}
                  clickRemoveButtonHandler={clickRemoveButtonHandler}
                />
              </div>
            ))}
        </div>

        <h2 className="list-title">Done..! 🎉</h2>
        <div className="working">
          {todos
            .filter((item) => item.isDone)
            .map((item) => (
              <div key={item.id}>
                <Todo
                  item={item}
                  completeFunction={clickDoneButtonHandler}
                  clickRemoveButtonHandler={clickRemoveButtonHandler}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

//todo리스트 부분
const Todo = ({ item, clickRemoveButtonHandler, completeFunction }) => {
  const { id, title, contents, isDone } = item;

  const clickDoneButtonHandler = () => {
    completeFunction(id);
  };
  return (
    <div key={item.id} className="component-style">
      <div className="todocontents">
        <div className="title">{title}</div>
        <div className="contents">{contents}</div>
      </div>

      <div className="btns">
        {/* 삭제버튼 랜더링 */}
        <button
          className="removebtn"
          onClick={() => clickRemoveButtonHandler(id)}
        >
          삭제하기
        </button>
        {/* 완료/취소버튼 렌더링*/}
        <button className="donebtn" onClick={clickDoneButtonHandler}>
          {isDone ? "취소" : "완료"}
        </button>
      </div>
    </div>
  );
};

export default App;
