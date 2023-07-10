const express = require('express')
const router = express.Router()


router.get('/', (req, res)=>{
    obj ={
        name: 'sushant',
        roll_no:'22bma041',
        grade:'A'
    }
    res.json(obj);
})

module.exports = router;