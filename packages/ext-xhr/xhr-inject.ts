(function (_xhr) {
  const XHR = XMLHttpRequest.prototype

  const open = XHR.open
  const send = XHR.send
  const setRequestHeader = XHR.setRequestHeader

  XHR.open = function (...args: any) {
    const [method, url] = args
    this._method = method
    this._url = url
    this._requestHeaders = {}

    return open.apply(this, args)
  }

  XHR.setRequestHeader = function (...args) {
    const [name, value] = args
    this._requestHeaders[name] = value
    return setRequestHeader.apply(this, args)
  }

  XHR.send = function (...args) {
    const [postData] = args
    this.addEventListener('load', function () {
      const url = (this._url instanceof URL ? this._url.href : this._url).toLowerCase()
      console.log(url)
      console.log(this.response)
      console.log(postData)
    })

    return send.apply(this, args)
  }
})(XMLHttpRequest)