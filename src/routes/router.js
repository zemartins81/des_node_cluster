const express = require('express')
const router = express.Router()
const client = require('../bd/redis')

router.post('/', async (req, res) => {
    const id = req.body.id
    client.get(id, function (err, reply) {
        if (reply) {
            res.sendStatus(403)
        } else {
            client.set(id, JSON.stringify(req.body))
            client.expire(id, 30)
            console.log(JSON.stringify(req.body))
            res.send(`Transação aceita!`)
        }
    })
})

module.exports = router