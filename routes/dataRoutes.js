// routes/dataRoutes.js
const express = require('express');
const Data = require('../models/Data');

const router = express.Router();

// Get filtered data
router.get('/', async (req, res) => {
  try {
    const { year, topic, region, sector, pestle, source, country } = req.query;
    const query = {};
    if (year) query.start_year = year;
    if (topic) query.topic = { $regex: new RegExp(topic, 'i') };
    if (region) query.region = { $regex: new RegExp(region, 'i') };
    if (sector) query.sector = { $regex: new RegExp(sector, 'i') };
    if (pestle) query.pestle = { $regex: new RegExp(pestle, 'i') };
    if (source) query.source = { $regex: new RegExp(source, 'i') };
    if (country) query.country = { $regex: new RegExp(country, 'i') };
    const data = await Data.find(query).limit(500);
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'An error occurred while retrieving data' });
  }
});

// Get unique filter values
router.get('/filters', async (req, res) => {
  try {
    const filters = {
      years: await Data.distinct('start_year'),
      topics: await Data.distinct('topic'),
      regions: await Data.distinct('region'),
      sectors: await Data.distinct('sector'),
      pestles: await Data.distinct('pestle'),
      sources: await Data.distinct('source'),
      countries: await Data.distinct('country'),
    };
    res.json(filters);
  } catch (error) {
    console.error('Error retrieving filters:', error);
    res.status(500).json({ error: 'An error occurred while retrieving filter values' });
  }
});

module.exports = router;