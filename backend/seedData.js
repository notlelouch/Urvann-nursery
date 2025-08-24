require('dotenv').config();
const mongoose = require('mongoose');
const Plant = require('./models/Plant');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedPlants();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

const plantsData = [
  // Indoor Plants
  { name: 'Money Plant', price: 299, categories: ['Indoor', 'Home Decor', 'Air Purifying'], availability: true, description: 'Easy to grow indoor plant that brings prosperity' },
  { name: 'Snake Plant', price: 399, categories: ['Indoor', 'Air Purifying', 'Low Maintenance'], availability: true, description: 'Perfect for beginners, purifies air naturally' },
  { name: 'Peace Lily', price: 499, categories: ['Indoor', 'Flowering', 'Air Purifying'], availability: true, description: 'Elegant white flowers with air purifying qualities' },
  { name: 'Rubber Plant', price: 599, categories: ['Indoor', 'Home Decor'], availability: true, description: 'Glossy leaves that add elegance to any room' },
  { name: 'Fiddle Leaf Fig', price: 899, categories: ['Indoor', 'Home Decor'], availability: false, description: 'Large leaves perfect for modern interiors' },
  { name: 'Monstera Deliciosa', price: 799, categories: ['Indoor', 'Home Decor'], availability: true, description: 'Instagram-famous plant with split leaves' },
  { name: 'ZZ Plant', price: 449, categories: ['Indoor', 'Low Maintenance', 'Air Purifying'], availability: true, description: 'Thrives in low light conditions' },
  { name: 'Philodendron Heartleaf', price: 349, categories: ['Indoor', 'Home Decor'], availability: true, description: 'Heart-shaped leaves perfect for hanging' },
  { name: 'Spider Plant', price: 199, categories: ['Indoor', 'Air Purifying', 'Low Maintenance'], availability: true, description: 'Produces baby plants naturally' },
  { name: 'Pothos Golden', price: 249, categories: ['Indoor', 'Low Maintenance', 'Air Purifying'], availability: true, description: 'Fast-growing vine with golden variegation' },

  // Outdoor Plants
  { name: 'Rose Plant', price: 399, categories: ['Outdoor', 'Flowering'], availability: true, description: 'Classic garden rose with fragrant blooms' },
  { name: 'Hibiscus', price: 299, categories: ['Outdoor', 'Flowering'], availability: true, description: 'Tropical flowering plant with large blooms' },
  { name: 'Jasmine', price: 349, categories: ['Outdoor', 'Flowering'], availability: true, description: 'Fragrant white flowers perfect for gardens' },
  { name: 'Bougainvillea', price: 449, categories: ['Outdoor', 'Flowering'], availability: true, description: 'Colorful bracts that bloom year-round' },
  { name: 'Marigold', price: 99, categories: ['Outdoor', 'Flowering'], availability: true, description: 'Bright orange and yellow annual flowers' },
  { name: 'Sunflower', price: 149, categories: ['Outdoor', 'Flowering'], availability: false, description: 'Tall plants with large yellow flower heads' },
  { name: 'Curry Leaf Plant', price: 199, categories: ['Outdoor', 'Medicinal'], availability: true, description: 'Essential herb for Indian cooking' },
  { name: 'Neem Plant', price: 299, categories: ['Outdoor', 'Medicinal'], availability: true, description: 'Natural pesticide and medicinal plant' },
  { name: 'Tulsi (Holy Basil)', price: 149, categories: ['Outdoor', 'Medicinal'], availability: true, description: 'Sacred plant with medicinal properties' },
  { name: 'Mint Plant', price: 99, categories: ['Outdoor', 'Medicinal'], availability: true, description: 'Fresh mint leaves for tea and cooking' },

  // Succulents
  { name: 'Jade Plant', price: 199, categories: ['Indoor', 'Succulent', 'Low Maintenance'], availability: true, description: 'Lucky plant with thick, fleshy leaves' },
  { name: 'Aloe Vera', price: 249, categories: ['Indoor', 'Succulent', 'Medicinal'], availability: true, description: 'Medicinal plant with healing gel' },
  { name: 'Echeveria', price: 179, categories: ['Indoor', 'Succulent'], availability: true, description: 'Rosette-shaped colorful succulent' },
  { name: 'String of Pearls', price: 299, categories: ['Indoor', 'Succulent', 'Home Decor'], availability: false, description: 'Trailing succulent with pearl-like leaves' },
  { name: 'Haworthia', price: 149, categories: ['Indoor', 'Succulent', 'Low Maintenance'], availability: true, description: 'Small striped succulent perfect for desks' },
  { name: 'Crassula Ovata', price: 199, categories: ['Indoor', 'Succulent'], availability: true, description: 'Tree-like succulent with round leaves' },
  { name: 'Sedum Varieties', price: 129, categories: ['Outdoor', 'Succulent', 'Low Maintenance'], availability: true, description: 'Colorful ground-covering succulents' },
  { name: 'Barrel Cactus', price: 399, categories: ['Indoor', 'Succulent', 'Low Maintenance'], availability: true, description: 'Round cactus perfect for sunny spots' },
  { name: 'Christmas Cactus', price: 349, categories: ['Indoor', 'Succulent', 'Flowering'], availability: true, description: 'Blooms beautiful flowers during winter' },
  { name: 'Prickly Pear Cactus', price: 299, categories: ['Outdoor', 'Succulent'], availability: false, description: 'Flat-padded cactus with edible fruits' },

  // Air Purifying Plants
  { name: 'Areca Palm', price: 699, categories: ['Indoor', 'Air Purifying', 'Home Decor'], availability: true, description: 'Elegant palm that purifies air naturally' },
  { name: 'Boston Fern', price: 399, categories: ['Indoor', 'Air Purifying'], availability: true, description: 'Lush green fern that adds humidity' },
  { name: 'English Ivy', price: 249, categories: ['Indoor', 'Air Purifying'], availability: true, description: 'Trailing ivy perfect for hanging baskets' },
  { name: 'Bamboo Palm', price: 599, categories: ['Indoor', 'Air Purifying'], availability: true, description: 'Pet-safe palm that filters air toxins' },
  { name: 'Dracaena Marginata', price: 549, categories: ['Indoor', 'Air Purifying', 'Low Maintenance'], availability: true, description: 'Dragon tree with spiky red-edged leaves' },

  // Flowering Plants
  { name: 'Anthurium', price: 599, categories: ['Indoor', 'Flowering', 'Home Decor'], availability: true, description: 'Glossy heart-shaped red flowers' },
  { name: 'African Violet', price: 299, categories: ['Indoor', 'Flowering'], availability: false, description: 'Compact plant with purple flowers' },
  { name: 'Begonia', price: 199, categories: ['Outdoor', 'Flowering'], availability: true, description: 'Colorful flowers perfect for borders' },
  { name: 'Geranium', price: 249, categories: ['Outdoor', 'Flowering'], availability: true, description: 'Classic garden flower with bright colors' },
  { name: 'Petunia', price: 149, categories: ['Outdoor', 'Flowering'], availability: true, description: 'Trumpet-shaped flowers in various colors' },

  // Home Decor Plants
  { name: 'Bird of Paradise', price: 999, categories: ['Indoor', 'Home Decor'], availability: false, description: 'Large tropical plant with split leaves' },
  { name: 'Calathea Orbifolia', price: 699, categories: ['Indoor', 'Home Decor'], availability: true, description: 'Large round leaves with silver patterns' },
  { name: 'Ficus Lyrata', price: 799, categories: ['Indoor', 'Home Decor'], availability: true, description: 'Violin-shaped leaves for modern spaces' },
  { name: 'Alocasia Amazonica', price: 649, categories: ['Indoor', 'Home Decor'], availability: true, description: 'Dark leaves with striking white veins' },

  // Low Maintenance Plants
  { name: 'Cast Iron Plant', price: 449, categories: ['Indoor', 'Low Maintenance'], availability: true, description: 'Nearly indestructible houseplant' },
  { name: 'Chinese Evergreen', price: 399, categories: ['Indoor', 'Low Maintenance', 'Air Purifying'], availability: true, description: 'Colorful leaves that tolerate low light' },
  { name: 'Ponytail Palm', price: 549, categories: ['Indoor', 'Low Maintenance'], availability: true, description: 'Unique bulbous base with long leaves' },

  // Medicinal Plants
  { name: 'Brahmi Plant', price: 199, categories: ['Outdoor', 'Medicinal'], availability: true, description: 'Memory-enhancing herb' },
  { name: 'Ashwagandha', price: 249, categories: ['Outdoor', 'Medicinal'], availability: false, description: 'Adaptogenic herb for stress relief' },
  { name: 'Lemongrass', price: 149, categories: ['Outdoor', 'Medicinal'], availability: true, description: 'Aromatic grass used in teas and cooking' },
  { name: 'Lavender', price: 299, categories: ['Outdoor', 'Medicinal', 'Flowering'], availability: true, description: 'Fragrant purple flowers with calming properties' }
];

async function seedPlants() {
  try {
    // Clear existing plants
    await Plant.deleteMany({});
    console.log('Cleared existing plants');

    // Insert new plants
    const plants = await Plant.insertMany(plantsData);
    console.log(`Successfully seeded ${plants.length} plants`);

    // Display summary
    const totalPlants = await Plant.countDocuments();
    const availablePlants = await Plant.countDocuments({ availability: true });
    const categories = await Plant.distinct('categories');
    
    console.log('\n--- Database Summary ---');
    console.log(`Total Plants: ${totalPlants}`);
    console.log(`Available Plants: ${availablePlants}`);
    console.log(`Out of Stock: ${totalPlants - availablePlants}`);
    console.log(`Categories: ${categories.join(', ')}`);
    console.log('--- Seeding Complete ---\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding plants:', error);
    process.exit(1);
  }
}