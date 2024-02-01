// prop 으로 text,type, onclick 세개가 필요하고 받아야 함 - 부모 컴포넌트인 App에서 현재 저 MyButton 컴포넌트 선언 했고 저기서 값 설정 되있음!

const MyButton = ({text,type,onClick}) =>{

  // positive, negative 외의 글자의 className을 가진 버튼이 들어오면 강제 default 처리
  const btnType = ['positive','negative'].includes(type)? type : 'default' ;

  return (
    <button 
          className={["MyButton",`MyButton_${btnType}`].join(" ")}  //join() : 배열끼리 병합!
          onClick={onClick}>
      {text}
    </button>
  )
}

MyButton.defaultProps = { // 이 컴포넌트에서 type 속성 받은게 없으면 무조건 type은 default 다!
  type : "default"
}

export default MyButton;