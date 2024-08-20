import { nextTick } from 'node:process'

setImmediate(() => {
  console.log('immediate1')
})
setImmediate(() => {
  console.log('immediate2')
})
setImmediate(() => {
  console.log('immediate3')
})

nextTick(() => {
  console.log("nextTick1")
})
nextTick(() => {
  console.log("nextTick2")
})

console.log("progam...")

// progam...
// nextTick1
// nextTick2
// immediate1
// immediate2
// immediate3

const delay = (time) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
async function _run() {
  await delay(2000)
  console.log('over')
}
_run()