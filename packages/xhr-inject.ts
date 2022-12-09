(function (_xhr) {
  const XHR = XMLHttpRequest.prototype

  const open = XHR.open
  const send = XHR.send
  const setRequestHeader = XHR.setRequestHeader

  const store: {
    method: string
    url: string | URL
    requestHeaders: Record<string, string>
  } = {
    method: '',
    url: '',
    requestHeaders: {},
  }
  XHR.open = function (...args: any) {
    const [method, url] = args
    store.method = method
    store.url = url

    return open.apply(this, args)
  }

  XHR.setRequestHeader = function (...args) {
    const [name, value] = args
    store.requestHeaders[name] = value
    return setRequestHeader.apply(this, args)
  }

  XHR.send = function (...args) {
    const [postData] = args
    this.addEventListener('load', function () {
      const url = (store.url instanceof URL ? store.url.href : store.url).toLowerCase()
      console.log(url)
      console.log(this.response)
      console.log(postData)
    })

    return send.apply(this, args)
  }
})(XMLHttpRequest)

