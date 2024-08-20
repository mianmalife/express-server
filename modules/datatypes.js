// Node
// 基本数据类型 7种
// String Number Boolean, Null, BigInt, Symbol, Undefined
// 对象数据类型 3种
// Function Buffer Array

// js  8种数据类型
// 7种基本数据类型
// String Number Undefined, Null, BigInt, Symbol Boolean
// 以及Object

const str = 'hello base'
console.log(str.charAt(1)) // e

const bn = BigInt(10n)
console.log(bn) // 10n
console.log(typeof bn) // bigint


// 2 3 5 7 11 13 17 19 23
// 判断是否是素数
function isPrime(num) {
  for (let i = 2n; i * i <= num; i++) {
    if (num % i === 0n) {
      return false
    }
  }
  return true
}

// 第n个素数
function nthPrime(nth) {
  let snth = 2n
  let prime = 0n
  while (nth >= 0n) {
    if (isPrime(snth)) {
      nth -= 1n
      prime = snth
    }
    snth += 1n
  }
  return prime
}
const n1 = nthPrime(6n)
console.log(n1) // 17n
// const isprime = isPrime(21401)
// console.log(isprime) // true
console.log(1n == 1) // true
console.log(1n === 1) // false