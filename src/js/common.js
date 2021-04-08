//正确的写法
let base={};
base.install = function(Vue,options){
  /* 
   *加密算法
   */
  Vue.prototype.compileStr = function(code) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
  }
  /* 
   *解密算法
   */
  Vue.prototype.uncompile = function(code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
  }
  // 升序排序
  // by函数接受一个成员名字符串做为参数
  // 并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
  Vue.prototype.ascBy = function(name) {
    return function(o, p) {
      let a, b;
      if (typeof o === "object" && typeof p === "object" && o && p) {
        a = o[name];
        b = p[name];
        if (a === b) {
          return 0;
        }
        if (typeof a === typeof b) {
          return a < b ? -1 : 1;
        }
        return typeof a < typeof b ? -1 : 1;
      } else {
        throw ("error");
      }
    }
  }
  // 降序排序
  // by函数接受一个成员名字符串做为参数
  // 并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
  Vue.prototype.descBy = function(name) {
    return function(o, p) {
      let a, b;
      if (typeof o === "object" && typeof p === "object" && o && p) {
        a = o[name];
        b = p[name];
        if (a === b) {
          return 0;
        }
        if (typeof a === typeof b) {
          return a > b ? -1 : 1;
        }
        return typeof a > typeof b ? -1 : 1;
      } else {
        throw ("error");
      }
    }
  }
  /* 字符串校验 */
  Vue.prototype.verifyString = function(key, value) {
    let result
    switch (key) {
      case "订单号":
        if (value) {
          result = true
        } else {
          result = false
          this.$message.warning(key + "不能为空")
        }
        break;
      default:
        result = true
        break;
    }
    return result
  };
  /* 字符串是否为空 */
  Vue.prototype.isEmptyString = function(item) {
    if (item == '' || item == null || item == undefined) {
      return true
    } else {
      return false
    }
  };
  /* 时间戳转换为时间 */
  Vue.prototype.timestampToTime = function(cjsj) {
    var date = new Date(cjsj * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return isNaN(Y) && isNaN(M) && isNaN(D) && isNaN(h) && isNaN(m) && isNaN(s) ? "" : Y + M + D + h + m + s
  };
};
export default base;
