const s = document.createElement('script')
s.src = chrome.extension.getURL('xhr-inject.js')

document.head.appendChild(s)