const router = require('express').Router()
const { ObjectId } = require('mongodb')

router.get('/', async (req, res) => {
  const collection = await db.collection('blogPost')
  const result = await collection.find({}).toArray()
  res.send(result).status(200)
})

router.get('/latest', async (req, res) => {
  const collection = await db.collection('blogPost')
  const result = await collection.find({}).sort({ date: -1 }).limit(1).toArray()
  res.send(result).status(200)
})

router.get('/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) }
  const collection = await db.collection('blogPost')
  const result = await collection.findOne(query)
  res.send(result).status(200)
})

router.post('/', async (req, res) => {
  const collection = db.collection('blogPost')
  let newComment = req.body
  newComment.date = new Date()
  const result = await collection.insertOne(newComment)
  res.send(result).status(204)
})

router.delete('/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) }
  console.log(query, req.params.id)
  const collection = await db.collection('blogPost')
  const result = await collection.deleteOne(query)
  res.send(result).status(200)
})

router.patch('/comment/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) }
  const updates = {
    $set: {
      ...req.body,
      date: new Date(),
    }
  }
  const collection = await db.collection('blogPost')
  const result = await collection.updateOne(query, updates)
  res.send(result).status(200)
})

module.exports = router