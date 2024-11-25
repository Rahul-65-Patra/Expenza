const express = require('express');
const { addTransection, getAllTransection,editTransection,deleteTransection } = require('../controllers/transectionCtrl');

// rouetr object
const router = express.Router();

// routers
//addTransection POST method
router.post('/add-transection',addTransection)

//editTransection POST method
router.post('/edit-transection',editTransection)
  
//deleteTransection POST method
router.post('/delete-transection',deleteTransection)

//getAllTransection POST method
router.post('/get-transection',getAllTransection)


module.exports = router;