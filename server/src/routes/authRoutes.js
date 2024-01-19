const express = require('express')

const router = express.Router()

router.post('/register', (req,res) => {
        res.send({
         "message":`Success`
        })
     })

module.exports = router
