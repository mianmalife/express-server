const { MongoClient } = require('mongodb')
require('dotenv').config()

const url = `mongodb://${process.env.USR}:${process.env.PASSWD}@localhost:27017/?authSource=blog`
// const url = `mongodb://localhost:27017`
console.log(url)
const client = new MongoClient(url)

const dbName = 'blog'

const connetServer = async () => {
  try {
    const conn = await client.connect()
    console.log('Connected Successfully to server')
    const db = conn.db(dbName)
    global.db = db
  } catch (error) {
    console.error(error)
  }
}

module.exports = connetServer