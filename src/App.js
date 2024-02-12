import React,{ useEffect, useReducer,useRef } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import New from './pages/New';


/* 일기 데이터를 변경 할때 마다 localStorage에 값 넣음,
   모든 데이터 수정은 이 reducer가 처리하고 있음.
   newState 가 변화 시 localStorage 데이터 넣으면 됨.
 */ 

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case 'INIT' : {
      return action.data;
    } 

    case 'CREATE' : {
      const newItem = {
        ...action.data
      };
      newState = [newItem, ...state];
      break;
    }

    case 'REMOVE' : {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    } 

    case 'EDIT' : {
      newState = state.map((it) => it.id === action.data.id? {...action.data}: it)
      break;
    }

    default : return false;
    
  }

  localStorage.setItem("diary" , JSON.stringify(newState));
  return newState;
}

export const DiaryStateContext = React.createContext(); // 데이터 공급!
export const DiaryDispatchContext = React.createContext(); //Dispatch 함수 실행

/*
const dummyData = [
  {id : 1,
   emotion : 1,
   content : "오늘의 일기장",
   date : 1706951453357,
  },
  {id : 2,
    emotion : 2,
    content : "오늘의 일기장2",
    date : 1706951453358,
   },
   {id : 3,
    emotion : 3,
    content : "오늘의 일기장3",
    date : 1706951453359,
   },
   {id : 4,
    emotion : 4,
    content : "오늘의 일기장4",
    date : 1706951453360,
   },
   {id : 5,
    emotion : 5,
    content : "오늘의 일기장5",
    date : 1706951453361,
   }
]
*/

function App() {

  /* 
     component 가 mount 되었을 때 localStorage에 있는 값 꺼내, 
     dataState 의 기초 값 사용 처리
  */   

  // 데이터 저장 state!
  const [data, dispatch] = useReducer(reducer, []); // useReducer()!

  useEffect (() => {
    // 현재 저장된 일기 정보들 저장! - 빈 배열이면 falsy 하지 않고 truethy 하게 됨.
    const localData = localStorage.getItem("diary");

    if(localData) {
      // 내림차순 정렬
      const diaryList = JSON.parse(localData).sort(
        (a,b) => parseInt(b.id) - parseInt(a.id)
      );
      if(diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1; // 빈 배열의 0번째 id를 꺼내려 하니 안되어 Error 발생
        dispatch({type : "INIT", data: diaryList});
      }
    }
  } , []); 

  const dataId = useRef(0); // dummydata로 임시 설정한 부분때메 발생!
  /* 1번째 버그 : Encountered two children with the same key, `1` 
                  즉 초기 값 설정 issue 로 인한 same key 오류 발생!
  */ 

  // dispatch 함수 만들기
  // CREATE - 날짜 , 내용 , 감정점수 - data 객체로 id,date 등등 전달 -> newItem에서 받고 처리
  const onCreate = (date,content,emotion) => {
    dispatch ({type : 'CREATE', 
      data :{
        id : dataId.current,
        date : new Date(date).getTime(),
        content,
        emotion
      },
    });
    dataId.current += 1;
  };

  // REMOVE - ID 내용 받아 그것만 삭제  - targetId 전달 -> targetId 필터한 나머지 요소 배열 정리
  const onRemove = (targetId) => {
    dispatch({type : 'REMOVE', 
      targetId
    });
  };

  // EDIT - 어떤 ID를 수정할지 중요 , 언제 바뀌었는지, 어떤 내용이 바뀌고 감정점수가 어떻게 바뀌었는가 체크!
  const onEdit = (targetId, date, content, emotion) => {
    dispatch ({type : 'EDIT', 
      data :{
        id : targetId,
        date : new Date(date).getTime(),
        content,
        emotion
      },
    }); 
  }; 

  return (
    <DiaryStateContext.Provider value = {data}>
      <DiaryDispatchContext.Provider value = {{onCreate , onEdit , onRemove}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} /> 
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} /> 
              {/* ★★ ':' (콜론) 을 사용! -> ex) /:id , id 라는 이름으로 뒤의 값 전달. 전달 값이 없더래도 동일한 요청 가능 */}
            </Routes>
          </div>
        </BrowserRouter>  
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;


// BrowserRouter로 감싸져 있는 부분, 브라우저 url 과 맵핑 가능.

// 브라우저 URL 변경 시, 어떤 컴포넌트 렌더링하여 그 컴포넌트가 페이지 역할 할건지 결정!

// path 가 / 시 Home 컴포넌트 렌더하게 지정함! 
// 지정한 path와 맞지 않는 url을 입력 시 경고 창이 뜸!
// Routes 안의 것만 렌더! 바깥은 유지되는 상태!

// 페이지 이동 - a태그는 mpa 의 방식 - 외부의 페이지만!

/*
  spa 방식으로 해야 함! - ★ 별도의 컴포넌트 사용 (RouteTest) , link를 import 시켜야 함!
  <a href = "a">a</a> ->
  ★★ <Link to= {"/a"}>a</Link>

  - Link to!

  <img src={process.env.PUBLIC_URL + '/assets/emotion1.png'} /> : process.env.PUBLIC_URL : 프로젝트 파일의 public 폴더를 바로 사용 할수 있게 함
*/

/*
  페이지 라우팅 (PAGE ROUTING) :

  라우팅 : 어떤 네트워크 내에서 통신 데이터를 내보낼 경로 선택하는 과정
                (지하철 역 - 네트워크 장치 환승)
  라우터 : 데이터의 경로를 실시간으로 지정해주는 역할을 하는 것!

  즉 라우팅은 : 경로 정해주는 행위와 과정들 전부 포함 

  페이지 라우팅 : 어떤 요청에 따라 어떤 페이지를 돌려줄지 결정하는 과정,  그 페이지를 반환 , 해당 페이지 접속하는 과정 자체!

  여러개 페이지를 세팅 해뒀다가 적절한 새로운 페이지를 보내주는 방식
  MPA : 멀티 페이지 어플리케이션 vs SPA : 싱글 페이지 어플리케이션

  리액트는 SPA 방식이다...
  서버와 통신은 데이터 주고 받을떄만 함. 
  모바일 앱과 동일. 
  다른 페이지 이동 시 브라우저 자체 내에서 리액트 앱이 변화 시켜버려 서버까지 굳이 가서 요청할 필요가 없음

  ★ CSR : 클라이언트 사이드 렌더링 (클라이언트 측에서 알아서 페이지 렌더링) 

  npm i react-router-dom@6 -> 확인은 pacakge.json 파일에서!

★★★라우팅 도와주는 3가지 라이브러리가 존재

1. Path Variable - useParams 
- 경로 변수 사용 , 상세 페이지 구현 - url에 변수를 담아서 전달
- ':' (콜론) 을 사용! -> ex) /:id , id 라는 이름으로 뒤의 값 전달. 전달 값이 없더래도 동일한 요청 가능 
ex) url/변수

2. Query String - useSearchParams
- URL + data 전달 동시에, 웹 페이지에 데이터 전달하는 가장 간단 방법
-> 기존 : url?a=b&c=d  , setSearchParams({e:f, g:h})  
-> 결과 : url?e=f&g=h 로 변경

ex) url/edit?id=10&mode=dark  , 별도의 맵핑 하지 않아도 자동 맵핑 ?뒤의 경로는 라우팅 경로에 영향 없음.

3. Page Moving - useNavigate                                                                                                     
- 어떤 함수, 유저의 액션 없이도 강제이동

ex) navigate (-1) : 뒤로 가기

-> Home : 일기 리스트 , New - 일기 생성 로직 , Edit - 일기 수정 로직 , Diary - 한 일기의 데이터
 */ 

/*
  상태 방식 : App - 일기 데이터 state
*/

/*
  https://developer.mozilla.org/ko/docs/Web/API/Web_Storage_API 참조
  localStorage : 웹 브라우저의 Database 역할 , Key 와 Value 쌍으로 저장 ,
                 브라우저 닫았다 열어도 데이터가 존재, 유효기간 없음 
                 javascript 사용하거나, 브라우저 캐시 로컬 저장 Data를 지워야 사라짐

  SessionStorage 에 데이터 저장 , 웹 브라우저가 꺼지면 Data 날라감.

  ex) 
  useEffect(() => {
    localStorage.setItem('item', 10);
    localStorage.setItem('item2', "20");
    localStorage.setItem('item3', JSON.stringify({value:30})); 
    // ★ 객체가 저장 시에는 Storage가 받아 들일수 없는 값, JSON.Stringfy로 직렬화 시켜 문자열 해석 처리!


    // localStorage에 Data 꺼내오는 방법!
    useEffect(() => {
      const item1 = localStorage.getItem("item");
      const item2 = localStorage.getItem("item2");
      const item3 = localStorage.getItem("item3");
      console.log(item1,item2,item3);
    }, []);

    ★★ -단 getItem으로 가져올 때, 
    localStorage.getItem("key");  
    localStorage에 들어가는 값들은 전부 '문자열' 로 바꿔 들어옴
    문자열이면 상관 없지만, 만약 저장한 값이 '숫자'거나 '객체'면
    숫자일 경우,  parseInt , 
    객체일 경우,  Json.parse를 한번 더 처리 해 저장했던 자료형으로 복구 시켜야 함
  }, []);


   최적화 
   1) 날짜 조회 하는데 있어 
      최신순 전부다 새일기쓰기 버튼 까지 새로 렌더 될 필요 없음,
      DiaryList의 ControlMenu 가 계속 랜더링 되고 있음

   2) 수정하기 컴포넌트에 (DiaryEditor) - EmotionItem 컴포넌트가 쓸데 없이 렌더 됨, 오늘의 일기 수정 시....
   
   
   배포 (VSC를 관리자 모드로 실행)
   - npm run build 
   - serve -s build 입력 - 오류 발생 시엔 Set-ExecutionPolicy Unrestricted 치고 명령어 입력!
   - 변경 사항이 있어서 내용 바꿀 시 localhost에 바로 적용 안됨 - serve -s build 를 해야 바뀜.

   How to 배포
   1) 서버 구축
   2) 배포 솔루션 사용 - 
      FireBase - 시작하기 - 프로젝트 만들기 - 지정 이름 입력 
      - 구글 애널리스트 도구 체크 해제 - 계속 - 빌드 - Hosting - 시작하기 - Firebase CLI 설치 (npm 명령어 복사 - cmd(관리자 모드) 에 붙여 넣기) - 다음 - 프로젝트 초기화 - 
      firebase login - Y - 
      firebase init 진행 (★ 단 root 아래에서 바로 진행!) - y - hosting - enter! - Use an existing project 입력 - build - y
      다음 - 밑에 여러 사이트 지원 - 다른 사이트 추가(지정 이름) - firebase.json 파일 - hosting ("site" : "지정 이름" ) 
      - npm run build - firebase deploy - Hosting URL! 
 */
 
