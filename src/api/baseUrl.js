let baseUrl = 'https://mobiletest.derucci.net' // 'http://127.0.0.1:7300/mock/5d8083aac7baa32524d68c61' // 'https://mobiletest.derucci.net/consumer-admin'

if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://mobiletest.derucci.net'
}
export {
  baseUrl
}