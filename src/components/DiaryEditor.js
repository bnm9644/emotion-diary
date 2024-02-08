//new.js 일기 작성의 날짜 받는 부분과 헤더 부분 이관

import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader"; 
import EmotionItem from "./EmotionItem";
import { useContext } from "react";
import { DairyDispatchContext } from "../App";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

// 감정 List 
const emotionList = [
  {
    emotion_id:1,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript : '완전 좋음'
  },

  {
    emotion_id:2,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript : '좋음'
  },

  {
    emotion_id:3,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript : '그닥'
  },

  {
    emotion_id:4,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript : '나쁨'
  },

  {
    emotion_id:5,
    emotion_img : process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript : '끔찍함'
  }
]


// Date 시간 변환 
const getStringDate = (date) => {
  return date.toISOString().slice(0,10); //  MDN Web Docs 참고
}

const DiaryEditor = () => {
  
  const contentRef = useRef();
  const [content,setContent]  = useState(""); //오늘의 일기 state 맵핑 확인
  const [emotion, setEmotion] = useState(3); // 어떤 감정 선택 한건지 확인 하게 하는 state

  const [onCreate] = useContext(DairyDispatchContext);
  // EmotionItem 을 클릭 할때 emotion state가 변하는 함수
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  }

  // 작성완료 버튼 누르고 정보 저장까지
  const handleSubmit = () => {
    if(content.length < 1) {
      contentRef.current.focus();
      return;
    }
  }

  const [date, setDate] = useState(getStringDate(new Date()));
  const Navigate = useNavigate();

  return (
    <div className="DiaryEditor">
      {/* 헤더 창에 센터 문구와  왼쪽 버튼, 오른쪽 버튼 지정 및 기능 설정케 해줌! */}
      <MyHeader 
        headtext={'일기 작성'}
        leftChild={ <MyButton text ={"< 뒤로 가기"} onClick={()=> Navigate(-1)}/> }
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
          <div ClassName = "input_box text_wrapper">
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

