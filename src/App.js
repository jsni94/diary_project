import React from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useState, useRef } from "react";

// const dummyList = [
//   {
//     id: 1,
//     author: "정상일",
//     content: "하이 1",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "정상일",
//     content: "하이 2",
//     emotion: 4,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "정상일",
//     content: "하이 3",
//     emotion: 1,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState();
  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author: author,
      content: content,
      emotion: emotion,
      created_date: created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  return (
    <div>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={[data]} />
    </div>
  );
}

export default App;
