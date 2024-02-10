import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

// 시간순 정렬
const sortOptionList = [
  {value:"latest" , name:"최신순" },
  {value:"oldest" , name:"오래된 순" },
]; 

// 감정 필터 정렬 
const filterOptionList = [
  {value : "all", name : "전부다" },
  {value : "good", name : "좋은 감정" },
  {value : "bad", name : "안좋은 감정" }
];

// 선택 조건 메뉴
const ControlMenu = ({value, onChange, optionList}) => {
 return (
    <select 
      className="ControlMenu" 
      value = {value} 
      onChange={(e) => onChange(e.target.value)
    }>
     {optionList.map((it,idx)=>
     <option key={idx} value = {it.value}>
      {it.name}
     </option> )}
    </select>
 );
};

const DiaryList = ({diaryList}) => {

  const navigate = useNavigate();

  // 선택 조건에 맞게 정렬 , latest로 인한 2번째 버그 - 오타 주의! - 이런 오타를 막아주는 기능을 갖고 있는 TypeScript를 배울 것!
  const [sortType, setSortType] = useState("latest");
  // 감정상태에 맞게 정렬
  const [filter,setFilter] = useState("all");

  // option 태그 최신/오래된 순 여부에 따라 리스트 값 변화
  const getProCessedDiaryList = () => {
    
    // 필터링 함수 
    const filterCallBack = (item) => {
      if(filter ==="good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    }

    // 비교함수
    const compare = (a,b) => {
      if(sortType==="latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }
    
    const copyList = JSON.parse(JSON.stringify(diaryList)); // diaryList를 json화 시켜 문자열로 바꿔버림
    
    const filteredList = filter === 'all'? copyList : copyList.filter((it) => filterCallBack(it));


    const sortedList = filteredList.sort(compare);
    // const sortedList = copyList.sort(compare);
    return sortedList;
  }

  return (
    <div className="DiaryList">
    
    <div className = "menu_wrapper">
      <div className="left_col">
        <ControlMenu 
          value={sortType} 
          onChange={setSortType}
          optionList={sortOptionList}
        />
        <ControlMenu
          value = {filter}
          onChange = {setFilter}
          optionList={filterOptionList}
        />
      </div>
      <div className="right_col">
        <MyButton 
          type ={'positive'} 
          text = {'새 일기 쓰기'} 
          onClick={() => navigate('/new') }
      />
      </div>
    </div> 
        
    {getProCessedDiaryList().map((it) => (
       <DiaryItem key = {it.id} {...it}/>
    ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList : [],
}

export default DiaryList;