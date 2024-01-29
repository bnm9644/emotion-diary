import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RouteTest from './components/RouteTest';

import Home from './pages/Home';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import New from './pages/New';

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
*/
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/new' element={<New />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/diary' element={<Diary />} />
        </Routes>

        <RouteTest />
      </div>
    </BrowserRouter>  
  );
}

export default App;
