import React from "react";
import DiaryItem from "./DiaryItem";

const DiaryList = ({ onEdit, diaryList, onDelete }) => {
  console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {/* 유니크 키 프롭 그 에러가 나면 mpa의 두번째 파라미터로 idx값을
        넘겨주거나 key값이 있다면 아래처럼 key값을 넘겨주면 에러 해결 */}
        {diaryList.map((it) => (
          //여기서 props로 각 객체(it)을 넘겨줄 때 왜 스프레드 연산자를 사용해야 할까/
          //=> 스프레드 연산자를 사용하면 원래 author={it.author}와 같이 넘겨주어야 하는 것들을 보다 간편하게
          //porps로 넘겨줄 수 있다.
          <DiaryItem key={it.id} {...it} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

//defaultProps를 설정하는 이유? => 만약 이 컴포넌트에 props로 undefined
//와 같은 갑이 내려오게 되면 오류가 날 수밖에 없기 때문에 기본값으로 빈배열을
//설정해주면 적어도 오류가 나는 일은 없다.
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
