const express = require('express');
const { body, validationResult } = require('express-validator');
const Plant = require('../models/Plant');

const router = express.Router();

// GET /api/plants - Get all plants with search and filter
router.get('/', async (req, res) => {
  try {
    const { search, category, availability } = req.query;
    let query = {};

    // Search by name or category keyword (case-insensitive)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { categories: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category && category !== 'all') {
      query.categories = { $in: [category] };
    }

    // Filter by availability
    if (availability !== undefined) {
      query.availability = availability === 'true';
    }

    const plants = await Plant.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching plants',
      error: error.message 
    });
  }
});

// GET /api/plants/:id - Get single plant
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    
    if (!plant) {
      return res.status(404).json({ 
        success: false, 
        message: 'Plant not found' 
      });
    }

    res.json({
      success: true,
      data: plant
    });
  } catch (error) {
    console.error('Error fetching plant:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching plant',
      error: error.message 
    });
  }
});

// POST /api/plants - Add new plant (Admin feature)
router.post('/', [
  body('name')
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Plant name is required and must be less than 100 characters'),
  body('price')
    .isNumeric({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('categories')
    .isArray({ min: 1 })
    .withMessage('At least one category is required'),
  body('categories.*')
    .isIn(['Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 'Home Decor', 'Flowering', 'Low Maintenance', 'Medicinal'])
    .withMessage('Invalid category'),
  body('availability')
    .isBoolean()
    .withMessage('Availability must be true or false')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, price, categories, availability, image, description } = req.body;

    // Check if plant with same name already exists
    const existingPlant = await Plant.findOne({ 
      name: { $regex: `^${name}$`, $options: 'i' } 
    });
    
    if (existingPlant) {
      return res.status(400).json({
        existingPlant,
        success: false,
        message: 'A plant with this name already exists'
      });
    }

    const plant = new Plant({
      name,
      price: parseFloat(price),
      categories: [...new Set(categories)], // Remove duplicates
      availability,
      image: image || '',
      description: description || ''
    });

    await plant.save();

    res.status(201).json({
      success: true,
      message: 'Plant added successfully',
      data: plant
    });
  } catch (error) {
    console.error('Error adding plant:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding plant',
      error: error.message 
    });
  }
});

// GET /api/plants/categories/list - Get all available categories
router.get('/categories/list', (req, res) => {
  const categories = ['Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 'Home Decor', 'Flowering', 'Low Maintenance', 'Medicinal'];
  res.json({
    success: true,
    data: categories
  });
});

module.exports = router;