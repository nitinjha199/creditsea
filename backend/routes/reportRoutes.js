// routes/reportRoutes.js
const express = require('express');
const multer = require('multer');
const { uploadReport, getReportById } = require('../controllers/reportController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// POST /api/reports/upload - Upload and process XML file
router.post('/upload', upload.single('xmlfile'), uploadReport);

// GET /api/reports/:id - Get a specific report by its ID
router.get('/:id', getReportById);

module.exports = router;