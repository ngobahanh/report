const express = require('express');
const router = express.Router();
const controller = require('../controllers/exportController');

router.get('/excel', controller.exportToExcel);
router.get('/pdf', controller.exportToPDF);

module.exports = router;
