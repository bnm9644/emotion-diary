import { useParams } from "react-router-dom"; //React Router의 사용자 정의 Hooks - custom Hooks

const Diary = () => {

  const {id} = useParams();
  console.log(id);

  return (
    <div>
      <h3>Diary</h3>
      <p>이곳은 일기 상세 페이지 입니다.</p>
    </div>
  );
};

export default Diary;  