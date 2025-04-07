// utils/seedData.js
const Data = require('../models/Data');
const jsonData = require('../jsondata.json');

const seedData = async () => {
  try {
    const count = await Data.countDocuments();
    if (count === 0) {
      console.log('Seeding database with initial data...');
      await Data.insertMany(jsonData);
      console.log(`Database seeded with ${jsonData.length} records.`);
    } else {
      console.log(`Database already contains ${count} records. Skipping seed.`);
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedData;