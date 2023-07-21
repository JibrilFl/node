const express = require('express');

const { getContacts } = require('../controllers/contacnt-controller');


const router = express.Router();

router.get('/contacts', getContacts);

module.exports = router;