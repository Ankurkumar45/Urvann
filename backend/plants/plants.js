const mongoose = require('mongoose');
const dotenv = require('dotenv');
const plants = require('./plants.json');

dotenv.config({ path: '../.env' });

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    plantURL: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Plant = mongoose.model('Plant', plantSchema);

async function insertPlants() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        
        // Clear existing plants
        await Plant.deleteMany({});
        
        // Insert new plants
        const result = await Plant.insertMany(plants);
        console.log(`Successfully inserted ${result.length} plants`);
        
    } catch (error) {
        console.error("Error inserting plants:", error);
    } finally {
        await mongoose.disconnect();
    }
}

insertPlants();