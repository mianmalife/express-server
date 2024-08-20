const url = require('url')
const neturl = 'https://github.com/learning-zone/nodejs-basics?test=abc&start=efg'

const parseUrl = url.parse(neturl, true)
console.log(parseUrl.host) // github.com
console.log(parseUrl.protocol) // https:
console.log(parseUrl.query) // { test: 'abc', start: 'efg' }
console.log(parseUrl.search) // ?test=abc&start=efg
console.log(parseUrl.pathname) // /learning-zone/nodejs-basics