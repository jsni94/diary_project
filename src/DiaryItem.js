import React, { useRef, useState } from "react";
import "./App.css";

const DiaryItem = ({
  onEdit,
  author,
  content,
  created_date,
  emotion,
  id,
  onDelete,
}) => {
  //수정중인지(true) 아닌지(false)를 나누는 state
  const [isEdit, setIsEdit] = useState(false);

  //수정중일 경우 보여지는 textArea의 값을 저장하는 state
  const [localContent, setLocalContet] = useState(content);

  //수정중 상태(true)와 수정중이 아닌 상태(false)를 변경해주는 함수
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const localContentInput = useRef();

  //수정취소를 누르고 다시 수정을 누를 때 textarea의 값을 초기화해주는 함수
  const handleQuitEdit = () => {
    //수정중을 나가는 상태니가 setIsEdit을 false로 바꿔주어야 함
    setIsEdit(false);
    setLocalContet(content);
  };

  //수정 완료 버튼을 누를 때 app.js에서 가져온 onEdit함수를 실행시켜 주는 함수(역방향 이벤트 흐름)
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  //리스트를 삭제하는 함수, 실제 삭제가 이루어지는 함수 ondelete는 부모 컴포넌트(App.js)에서 이루어진다.
  //리엑트의 이벤트 역방향 흐름
  const handleRemove = () => {
    //의사를 다시한번 물어볼 때 window.confirm을 활용하면 좋을 것 같다.
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <span className="content">
        {isEdit ? (
          <textarea
            ref={localContentInput}
            value={localContent}
            onChange={(e) => {
              setLocalContet(e.target.value);
            }}
          />
        ) : (
          content
        )}
      </span>
      <br />
      <div className="buttonWrap">
        {isEdit ? (
          <>
            <button onClick={handleQuitEdit}>수정취소</button>
            <button onClick={handleEdit}>수정완료</button>
          </>
        ) : (
          <>
            <button onClick={handleRemove}>삭제</button>
            <button onClick={toggleIsEdit}>수정</button>
          </>
        )}
      </div>
    </div>
  );
};

export default DiaryItem;
