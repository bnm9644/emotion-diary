//new.js 일기 작성의 날짜 받는 부분과 헤더 부분 이관

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useContext, useCallback } from "react";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader"; 
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App.js";

import { getStringDate } from "../util/date.js"
import { emotionList } from "../util/emotion.js";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

// 감정 List 

const DiaryEditor = ({isEdit, originData}) => {
  
  const contentRef = useRef();
  const [content,setContent]  = useState(""); // 오늘의 일기 state 맵핑 확인
  const [emotion, setEmotion] = useState(3);  // 어떤 감정 선택 한건지 확인 하게 하는 state
  const [date, setDate] = useState(getStringDate(new Date()));

  // 배열 받으면 안됨! - 배열 받아서 자꾸 에러 난거임
  const {onCreate, onEdit , onRemove} = useContext(DiaryDispatchContext);
  
  // EmotionItem 을 클릭 할때 emotion state가 변하는 함수
  // 최적화 시켜야 하기 때문에, useCallBack 사용
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const navigate = useNavigate();

  // 작성완료 버튼 누르고 정보 저장까지
  const handleSubmit = () => {
    if(content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if(window.confirm(isEdit? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까? ")) {
      if(!isEdit) {
        onCreate(date, content,emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    };

    navigate('/', {replace : true} ); // replace : true 옵션은 뒤로 못오게 막는 옵션,
  }

  // 수정 중 삭제 
  const handleRemove = () => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate('/', {replace : true} );
    }
  }

  useEffect(() => {
    //isEdit이 true일때만 수행
    if(isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  },[isEdit,originData]);

  
  const Navigate = useNavigate();

  return (
    <div className="DiaryEditor">
      {/* 헤더 창에 센터 문구와  왼쪽 버튼, 오른쪽 버튼 지정 및 기능 설정케 해줌! */}
      <MyHeader 
        headtext={isEdit? "일기 수정하기" : "새 일기 쓰기"}
        leftChild={ <MyButton text ={"< 뒤로 가기"} onClick={()=> Navigate(-1)}/> }
        rightChild={
          isEdit && (
        <MyButton text ={"삭제하기"} type={"negative"} onClick = {handleRemove}/>
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className ="input_box">
            <input 
              className="input_date"
              value = {date}
              onChange = {(e) => setDate(e.target.value)}
              type = "date"
            /> {/* 연도와 월 일 즉 날짜를 선택하고 입력 받을수 있는 창 */}
          </div>
        </section>
        {/* isSelected 속성값은 true 와 false 를 이용하여 자신이 선택되었는지를 체크함 */}
        <section>
          <h4>오늘의 감정</h4>
          <div className = "input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem key = {it.emotion_id} {...it}
                           onClick = {handleClickEmote}
                           isSelected = {it.emotion_id === emotion}/> 
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className = "input_box text_wrapper">
            <textarea 
              placeholder="오늘은 어땠나요?"
              ref = {contentRef} 
              value = {content} 
              onChange = {(e) => {setContent(e.target.value)}}/>
          </div>
        </section>

        <section>
          <div className ="control_box">
            <MyButton text={"취소하기"} onClick = {() => Navigate(-1)}/>
            <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit}/>
          </div>
        </section>
      </div>
    </div> 
  );
}

export default DiaryEditor;

