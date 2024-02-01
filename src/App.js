import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import New from './pages/New';

// component!
import MyButton from './components/MyButton';
import MyHeader from './components/MyHeader';

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
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader headtext={"App"} 
                  leftChild={ <MyButton text={'왼쪽 버튼'} onClick={()=> alert('왼쪽 클릭')} /> } 
                  rightChild={ <MyButton text={'오른쪽 버튼'} onClick={()=> alert('오른쪽 클릭')} /> }
        />
        <h2>App.js</h2>

        <MyButton text={'버튼'} onClick={()=>alert('버튼 클릭')} type={"positive"}/>
        <MyButton text={'버튼'} onClick={()=>alert('버튼 클릭')}/>
        <MyButton text={'버튼'} onClick={()=>alert('버튼 클릭')} type={"negative"}/>
        
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/new' element={<New />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/diary/:id' element={<Diary />} /> 
          {/* ★★ ':' (콜론) 을 사용! -> ex) /:id , id 라는 이름으로 뒤의 값 전달. 전달 값이 없더래도 동일한 요청 가능 */}
        </Routes>
      </div>
    </BrowserRouter>  
  );
}

export default App;


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

 */ 