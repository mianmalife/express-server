import { readFile, open } from 'node:fs/promises'
import { createReadStream, createWriteStream } from 'node:fs'
import { createGzip } from 'node:zlib'

// import.meta 模块的上下文信息
// new URL 构建url对象
// 读文件
// try {
//   const filePath = new URL('../package.json', import.meta.url)
//   const filedata = await readFile(filePath, { encoding: 'utf-8' })
//   console.log(JSON.parse(filedata))
// } catch (error) {
//   console.error(error)
// }

let data = ",test: 123"
// 创建读取流
// try {
//   const filePath = new URL('../package.json', import.meta.url)
//   const fd = await open(filePath)
//   const readStream = fd.createReadStream()
//   readStream.setEncoding('utf8')
//   readStream.on('data', (chunk) => {
//     data += chunk
//   })
//   readStream.on('end', () => {
//     console.log('read end', data)
//   })
//   readStream.on('error', err => {
//     console.error(err)
//   })
// } catch (error) {
//   console.error(error)
// }

// 创建写入流
// try {
//   const filePath = new URL('../package.json', import.meta.url)
//   const writeStream = createWriteStream(filePath, { encoding: 'utf8', flags: 'a' })
//   writeStream.write(data)
//   writeStream.end()
//   writeStream.on('finish', () => {
//     console.log('write finish')
//   })
// } catch (error) {
//   console.error(error)
// }

// 管道pipe
const pathObj = new URL('./input.txt', import.meta.url)
// createReadStream(pathObj).pipe(createWriteStream(new URL('./output.txt', import.meta.url), { flags: 'a'}))
createReadStream(pathObj)
.pipe(createGzip())
.pipe(createWriteStream(new URL('./input.txt.gz', import.meta.url)))
console.log('file compressed')