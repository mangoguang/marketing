let starUrl = 'http://10.11.8.8:8090'
let caseUrl = 'http://127.0.0.1:7300/mock/5d8083aac7baa32524d68c61' // 'https://mobiletest.derucci.net/consumer-admin'

if (process.env.NODE_ENV === 'production') {
  starUrl = 'https://mobiletest.derucci.net/cd-sys-web'
}
export {
  starUrl,
  caseUrl
}