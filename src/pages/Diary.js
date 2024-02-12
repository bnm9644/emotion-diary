import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; //React Router의 사용자 정의 Hooks - custom Hooks
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date.js"
import MyHeader from "../components/MyHeader.js";
import MyButton from "../components/MyButton.js";
import { emotionList } from "../util/emotion.js";

const Diary = () => {

  const {id} = useParams();   // 조회 하는 id의 일기 데이터를 가져와야 함
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();   // 뒤로 가기 방지!
  const [data, setData] = useState();

  // 기능 구현 할때 마다 , title 내용 변경, Diary 상세 페이지가 켜질때 
  // element 에서 title이라는 element 가지는 건 head 안의 title 태그 밖에 없음
  // 문서 객체에서 title이라는 tagName을 갖는 모든 Element 가져와 배열로 반환
  useEffect( () => {   
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, []); 

  useEffect(()=>{
    if(diaryList.length >= 1) {
      const targetDiary = diaryList.find(
          (it) => parseInt(it.id) === parseInt(id)
      );

      console.log(targetDiary); // 해당하는 id에 맞게 잘 가져오는지 Check!

      // 일기가 존재 할 때
      if(targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", {replace: true});
      }
    }
  }, [id,diaryList]);

  if(!data) {
    return <div className = "DiaryPage">로딩중입니다...</div>
  } else {

    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    console.log(curEmotionData);

    return (
    <div className = "DiaryPage">
      <MyHeader 
        headtext={`${getStringDate(new Date(data.date))} 의 기록`} 
        leftChild={
          <MyButton text ={"< 뒤로 가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          <MyButton text ={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)} />
        }
    />
    <article>
        <section>
          <h4>오늘의 감정</h4>
          <div 
            className = {[
              "diary_img_wrapper", 
              `diary_img_wrapper_${data.emotion}`,
            ].join(" ")}
          >
            <img src = {curEmotionData.emotion_img} />
            <div className = "emotion_descript">
              {curEmotionData.emotion_descript}
            </div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{data.content}</p>
          </div>
        </section>
    </article>
    </div>
    
    );
  }

};

export default Diary;  