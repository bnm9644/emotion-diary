import { useContext, useEffect, useState } from "react"; //context로 부터 공급받는 data, diaryList 를 받어야 함 
import { useNavigate , useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {

  // targetDiary 데이터 저장할 state
  const [originData , setOriginData] = useState();

  const navigate = useNavigate();
  /* 
    id를 받아와 id에 해당하는 수정 데이터 들고와야 함, 
    데이터는 App.js 의 데이터 저장 state!
    const [data, dispatch] = useReducer(reducer, dummyData); 를 이용!
  */
  const {id} = useParams();   
  const diaryList = useContext(DiaryStateContext); //DiaryStateContext가 제공하는 DiaryList 데이터 받아옴 -> 받아오면 id 값과 일치하는 일기 데이터만 꺼내주면 됨
  
  useEffect( () => {   
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  //Edit 컴포넌트가 마운트 될때 사용, useEffect!
  useEffect(() => {
    if(diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it)=> parseInt(it.id) === parseInt(id)
      );
      console.log(targetDiary);

      if(targetDiary) { //state에 넣어 사용!
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate('/', {replace : true});
      }

    }    
  },[id,diaryList]); //id 와 diaryList가 변할때만 다른 데이터를 가져옴

  return (
    <div>
      {originData && <DiaryEditor isEdit = {true} originData =  {originData}/>};
    </div>
  );
};

export default Edit;  










// ★ 페이지 이동 시킬수 있는 기능하는 함수 하나 반환! - 그걸 navigate라는 변수이름으로 받았고 그 변수이름의 인자로 경로를 작성하면 지정 경로로 감!
  // 링크 태그를 클릭 안해도 의도적으로 페이지를 바꿔 버릴수 있음!

  /*const [searchParams, setSearchParams] = useSearchParams();
  ★ useState 와 유사 기능. setSearchParams 는 searchParams 를 변경시키는 기능! ,즉 queryString 바꿀수 있음

  현재는 id 와 mode 를 들고 올것이라...
  const id = searchParams.get('id'); console.log("id :", id);
  const mode = searchParams.get('mode'); console.log("mode :", mode);

      <h3>Edit</h3>
      <p>이곳은 일기 수정 페이지 입니다.</p>
      <button onClick = {() => setSearchParams({who:'winterlood'})}>
        QS 바꾸기
      </button>

      <button onClick = {() => navigate('/home')}>
        HOME 으로 가기
      </button>

      <button onClick = {() => navigate(-1)}> 
        뒤로 가기
      </button>

  */