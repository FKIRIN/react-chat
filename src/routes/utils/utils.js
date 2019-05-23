export function generateTime() {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  hour = hour === 0 ? '00' : hour;
  minute = minute < 10 ? '0' + minute : minute;
  return hour + ':' + minute;
}

export function generateMsgId() {
  return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100);
}