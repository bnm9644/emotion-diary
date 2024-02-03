import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader"; 
import MyButton from "./../components/MyButton"; 
import DiaryList from "./../components/DiaryList";

const Home = () => {
  
  const diaryList = useContext(DiaryStateContext);

  //날짜 별 리스트 추리기 위해 데이터 가공
  const [data, setData] = useState([]);

  // 날짜 저장 state 
  const [curDate , setCurDate] = useState(new Date());
  const headtext = `${curDate.getFullYear()}년 ${curDate.getMonth()+1} 월`;
  
  // curDate가 변할때만 useEffect 작동, 
  // diaryList : 일기가 새로 추가, 삭제, 변경
  useEffect(()=> {

    if(diaryList.length >= 1) {

      // console.log(new Date(firstDay)); // 해당 월의 첫번째 날짜
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      // console.log(new Date(lastDay)); // 해당 월의 마지막 날짜
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();    

      // 해당 월의 첫째날과 마지막날 사이에 작성된 일기 추리기 위함
      setData(
        diaryList.filter((it)=> firstDay <= it.date && it.date <= lastDay)
      )
    }

  } ,[diaryList,curDate]);

  useEffect(() => {
    console.log(data);
  }, [data])

  // 월 하나씩 증가 하는 함수
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate())
    );
  }

  // 월 하나씩 감소 하는 함수
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate())
    );
  }

  return (
    <div>
      <MyHeader 
        headtext={headtext}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth}/>}
        rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
      />
      <DiaryList diaryList ={data}/>
    </div>
  );
};

export default Home;  