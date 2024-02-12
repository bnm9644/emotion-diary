import React from "react";

// 감정표현 state 받아 처리 하기 위한 Component
const EmotionItem = ({
  emotion_id, 
  emotion_img, 
  emotion_descript, 
  onClick, 
  isSelected}) => {
  return (
    <div onClick = {() => onClick(emotion_id)} 
         className = {["EmotionItem" , 
         isSelected ? `EmotionItem_on_${emotion_id}` : `Emotion_off`,].join(" ")}>
      <img src = {emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);

//React.memo로 최적화 하게 끔 묶었으나 최적화가 안되는 이유는 onClick 때문임, 이 onClick은 상태변화 함수가 아님.