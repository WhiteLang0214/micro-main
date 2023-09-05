const API_HOST = process.env.VUE_APP_API_HOST;

/**
 * 工具类
 */
/**
 * 判断数据类型
 * @param {any} value 
 * @returns {String}
 * 返回数据为：
 * "[object Number]","[object String]","[object Boolean]","[object Date]","[object RegExp]"
 * "[object Object]"，"[object Array]"，"[object Function]","[object Null]","[object Undefined]"
 */
function getDataType(value) {
  return Object.prototype.toString.call(value)
}
/**
 * 日期格式化
 * @param fmt 格式
 * @param date 日期
 */
function dateFormat(fmt, date) {
  date = new Date(date);
  let ret;
  let opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
  }
  return fmt;
}

function trim(str) {
  return str.replace(/^\s*|\s*$/g, "");
}

/**
 * 根据数据对象的某个字段去重
 * item.name  是[{name:1}] 根据每条数据的name值来去重
 */
function unique(arr, val) {
  const res = new Map();
  return arr.filter(item => !res.has(item[val]) && res.set(item[val], 1))
}



// 全屏方法，参数：当前组件this ； 是否全屏的标识字段 ； 全屏的对象(使用document.getElementById('')  或者  this.el.nativeElement.children[1] 都可以)
function toggleCreen(that, ifFullScreen, screenElement) {
  if (that[ifFullScreen]) {
    that[ifFullScreen] = false;
    const element = screenElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
    else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }

    else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    }

    else if (element.msRequestFullScreen) {
      element.msRequestFullScreen();
    }
  } else {
    that[ifFullScreen] = true;
    const element = document;
    if (element.cancelFullscreen) {
      element.cancelFullscreen();
    }
    else if (element.webkitExitFullscreen) {
      element.webkitExitFullscreen();
    }
    else if (element.webkitCancelFullScreen) {
      element.webkitCancelFullScreen();
    }
    else if (element.mozCancelFullScreen) {
      element.mozCancelFullScreen();
    }

    else if (element.msExitFullScreen) {
      element.msExitFullScreen();
    }
  }
}

/*
  监听resize，识别当按下esc时，退出全屏，标准用法
  params: {
    that : 当前组件，传this值
    ifFullScreen:是否全屏的标识，
    element ： 全屏对象，
    isJudgeDom ： 是否要判断Do , 用于在init中添加是否继续监听，
        在组件init中,建议为true。那么，在从当前页面切换页面时，就不会继续监听resize事件了。
        在组件constroter中，可以收听到广播时，建议为false。不比判断dom是否存在
        存在的意义：当首次打开当前页面，并且同时打开其他页面时（两个tab）, 不会收听到广播，所以添加了后两个参数，在init时添加一层判断
    id : isJudgeDom为true时，必填，值为可以判断当前页面是否存在的dom值
  }
*/
function escExitScreen(that, ifFullScreen, element, isJudgeDom = false, id = "") {
  if (isJudgeDom == true) {
    window.onresize = () => {
      if (document.getElementById(id)) {
        if (!Tool.checkFull(element)) {
          // 退出全屏后要执行的动作
          that[ifFullScreen] = true;
        }
      } else {
        window.onresize = null;
      }
    }
  } else {
    window.onresize = () => {
      if (!Tool.checkFull(element)) {
        // 退出全屏后要执行的动作
        that[ifFullScreen] = true;
      }
    }
  }
}

function checkFull(element) {
  const screen = window.screen
  const body = element.getBoundingClientRect()
  return screen.height === body.height && screen.width === body.width
}

function getDocUrl(url) {
  if (url) {
    let token = sessionStorage.getItem("userkey")
    return `${process.env.NODE_ENV === "development" ? 'http://devuser.leandc.cn/api' : API_HOST}/uc/basDoc/show/${url}?Authorization=${encodeURIComponent(token)}`;
  }
}

export {
  getDataType,
  dateFormat,
  trim,
  unique,
  toggleCreen,
  escExitScreen,
  checkFull,
  getDocUrl
}