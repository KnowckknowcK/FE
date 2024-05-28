/** @format */

function formatDateTime(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2,'0');
  const minutes = date.getMinutes().toString().padStart(2,'0');

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;

  return formattedDate;
}

export default formatDateTime;
