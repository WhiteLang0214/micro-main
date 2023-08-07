export default class cookieData {
  constructor(cookieKey = "Authorization=", cookieValue = "") {
    this.cookieKey = cookieKey;
    this.cookieValue = cookieValue;
  }

  get() {
    const cookieData = document.cookie;
    const cookieArr = cookieData.split(this.cookieKey)
    return {
      key: this.cookieKey,
      value: cookieArr[1]
    }
  }

  set() {
    const value = this.cookieKey + this.cookieValue
    document.cookie = value;
    return value;
  }

  clear() {
    this.cookieKey = "";
  }
}