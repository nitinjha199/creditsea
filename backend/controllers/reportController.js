// controllers/reportController.js
const fs = require('fs');
const Report = require('../models/reportModel');
const { parseExperianXML } = require('../services/xmlParserService');

// @desc    Upload XML, parse, and store data
// @route   POST /api/reports/upload
const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Check for file type
    if (req.file.mimetype !== 'text/xml' && req.file.mimetype !== 'application/xml') {
       // Clean up the uploaded file
       fs.unlinkSync(req.file.path);
       return res.status(400).json({ message: 'Invalid file type. Please upload an XML file.' });
    }

    const xmlData = fs.readFileSync(req.file.path, 'utf-8');
    const parsedData = await parseExperianXML(xmlData);
    
    const report = new Report(parsedData);
    await report.save();

    // Clean up the uploaded file after processing
    fs.unlinkSync(req.file.path);

    res.status(201).json({ 
        message: 'File uploaded and processed successfully!', 
        reportId: report._id,
        data: report
    });

  } catch (error) {
    // Also try to clean up if an error occurs
    if(req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get a single report by ID
// @route   GET /api/reports/:id
const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { uploadReport, getReportById };