//立即执行函数中，传入window,doucment避免全局污染
/*
思路是在页面初始化的时候设置一次html的字体大小
然后监听设备的宽度改变和刷新，在处理函数中获取当前屏幕的宽度，随之改变
html的font-size大小。
*/
(function flexible (window, document) {
//获取html
  var docEl = document.documentElement
//获取设备像素度比
  var dpr = window.devicePixelRatio || 1

  // adjust body font size 调整正文字体大小
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    //获取屏幕宽度
    var rem = docEl.clientWidth / 10
    // var rem = 750 / 10 
//修改html字体大小
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize   页面宽度改变时再次改变html的字体大小
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports 检测支持0.5px 
//看到这段代码有些疑惑 似懂非懂
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    console.log(testElement.offsetHeight)
    if (testElement.offsetHeight === 1) {
      
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))