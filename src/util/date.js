// Date 시간 변환 - export를 해야 보내는 명령어 나와 사용 가능!
export const getStringDate = (date) => {
  return date.toISOString().slice(0,10); //  MDN Web Docs 참고
};