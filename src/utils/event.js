
/**
 * 添加全局监听事件
 * @param {*} eventName 事件名称
 * @param {*} callback 回调函数
 */
export function addEventListener(eventName, callback) {
  window.addEventListener(eventName, callback);
}

/**
 * 移除全局监听事件
 * @param {*} eventName 事件名称
 */
export function removeEventListener(eventName) {
  window.removeEventListener(eventName, () => {});
}