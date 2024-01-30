import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {

  const navigate = useNavigate();
  // ★ 페이지 이동 시킬수 있는 기능하는 함수 하나 반환! - 그걸 navigate라는 변수이름으로 받았고 그 변수이름의 인자로 경로를 작성하면 지정 경로로 감!
  // 링크 태그를 클릭 안해도 의도적으로 페이지를 바꿔 버릴수 있음!

  const [searchParams, setSearchParams] = useSearchParams();
  // ★ useState 와 유사 기능. setSearchParams 는 searchParams 를 변경시키는 기능! ,즉 queryString 바꿀수 있음

  //현재는 id 와 mode 를 들고 올것이라...
  const id = searchParams.get('id'); console.log("id :", id);
  const mode = searchParams.get('mode'); console.log("mode :", mode);


  return (
    <div>
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
    </div>
  );
};

export default Edit;  