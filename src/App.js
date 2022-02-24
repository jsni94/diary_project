import React, { useEffect, useRef, useState } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

//https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    console.log(res);

    //slice메서드를 사용해서 res값중 20개만 추려내고 map함수를 사용해서 배열의 각각 모든 요소들을 순회에서
    //map함수의 콜백 함수에서 리턴하는 값들을 모아서 새로운 배열을 initdata에 할당하겠다.
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        //자바스크립트의 수학연산을 담당하는 내장객체 Math를 활용해서 Math.random() * 5 => 0 ~ 4까지의 랜덤 난수를 생성하게 되고
        //Math.random은 정수가 반환되지 않고 소수점이 나올 수 있기 때문에 floor로 소숫점을 버려 정수로 반환해주고 감정점수는 0~4가 아니라
        //1~5기 때문에 +1을 해준다.
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

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
    //여기서 스프레드 연산자가 사용되는 이유?
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    //왜 it.id !== targetId가 아닌게 삭제인가? => it.id 즉 data를 돌면서 각각의 값들을 filter함수가 돌면서 it으로 받는데, 그 각각의 값중
    //삭제할 targetId(it.id !== targetId)를 제외하고 남은 값들을 새로운배열로 반환해 주기 때문.
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  //글 수정시 동작하는 함수, targetId와 newContent를 매개변수(어떤 글인지, 어떤 내용인지 알아야 하기 때문에)로 받아와서
  //setData로 App.js의 data를 변경해준다. 변경시엔 map을 활용해서 기존 data안의 각각의 값들을 돌면서 targetId가 일치하는
  //값을 삼항 연산자를 활용해 변경해준다.
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} diaryList={data} onDelete={onDelete} />
    </div>
  );
}

export default App;
