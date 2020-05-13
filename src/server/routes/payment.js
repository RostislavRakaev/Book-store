const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    console.log('it did work')
});

router.get('/secret', (req, res)=>{
    
})

module.exports = router;