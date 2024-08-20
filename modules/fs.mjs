import { readFile, open } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'

// try {
//   const filePath = new URL('../package.json', import.meta.url)
//   const filedata = await readFile(filePath, { encoding: 'utf-8' })
//   console.log(JSON.parse(filedata))
// } catch (error) {
//   console.error(error)
// }

let data = ",test: 123"
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

try {
  const filePath = new URL('../package.json', import.meta.url)
  const writeStream = createWriteStream(filePath, { encoding: 'utf8', flags: 'a' })
  writeStream.write(data)
  writeStream.end()
  writeStream.on('finish', () => {
    console.log('write finish')
  })
} catch (error) {
  console.error(error)
}