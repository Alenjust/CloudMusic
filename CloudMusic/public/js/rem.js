// 移动端 rem适配
function remSize () {
  /* 获取设备宽度 */
  let deviceWith = document.documentElement.clientWidth || window.innerWidth
  /* 设计稿宽度 */
  if (deviceWith >= 750) {
    deviceWith = 750
  }
  if (deviceWith <= 320) {
    deviceWith = 320
  }
  /* 设置rem，
  750px--> 1rem=100px
  375px--> 1rem=50px
  */
  document.documentElement.style.fontSize = (deviceWith / 7.5) + 'px'
  /* 设置字体大小 */
  document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize()
/* 当窗口发生变化 */
window.onresize = function () {
  remSize()
}
