import { EventEmitter } from 'node:events'

const ev = new EventEmitter()

// ev.on('status', (code, msg) => {
//   console.log(code, msg)
// })
// ev.on('status', (code, msg) => {
//   console.log(code, msg, 2)
// })

// ev.emit('status', 200, 'ok')

ev.on('data_recieve', msg => {
  console.log(msg)
  console.log('load data successfully')
})

ev.on('connect', msg => {
  console.log(msg)
  console.log('connect successfully')
  ev.emit('data_recieve', 'load data...')
})

ev.emit('connect', 'connect...')
console.log('program onload finished...')