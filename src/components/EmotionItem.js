// 감정표현 state 받아 처리 하기 위한 Component
const EmotionItem = ({emotion_id, emotion_img, emotion_descript, onClick, isSelected}) => {
  return (
    <div onClick = {() => onClick(emotion_id)} 
         className = {["EmotionItem" , 
         isSelected ? `EmotionItem_on_${emotion_id}` : `Emotion_off`,].join(" ")}>
      <img src = {emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;