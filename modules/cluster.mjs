import cluster from 'node:cluster'
import { availableParallelism } from 'node:os'
import { pid } from 'node:process'
import http from 'node:http'

// cluster.isPrimary true 是主进程
// if (cluster.isPrimary) {
//   console.log('Primary is runnng')
//   cluster.fork()
//   cluster.fork()
// } else {
//   console.log('worker is running')
// }

// Primary is runnng
// worker is running
// worker is running

const cpuNum = availableParallelism()

if (cluster.isPrimary) {
  console.log(`primary ${pid} is running`)
  for(let i = 0; i < cpuNum; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(worker, code, signal)
  })
} else {
  http.createServer((req, res) => {
    res.writeHead(200)
    res.end('hello...')
  }).listen(8888)

  console.log(`worker ${pid} started`)
}