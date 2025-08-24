const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  categories: [{
    type: String,
    required: true,
    trim: true,
    enum: ['Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 'Home Decor', 'Flowering', 'Low Maintenance', 'Medicinal']
  }],
  availability: {
    type: Boolean,
    required: true,
    default: true
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Create indexes for search functionality
plantSchema.index({ name: 'text' });
plantSchema.index({ categories: 1 });
plantSchema.index({ availability: 1 });

module.exports = mongoose.model('Plant', plantSchema);