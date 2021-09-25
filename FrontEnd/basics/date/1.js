let nowTime = Date.now();
const zone = new Date().getTimezoneOffset();
if (zone === 0) {
    nowTime += 28800000; //UTC-0时区加上8个小时
}
//当天大于9:00才从API里面取收集的助力码
console.log(zone, new Date(nowTime).setHours(9, 0, 0, 0))