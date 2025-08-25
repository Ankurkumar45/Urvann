const express = require('express');
const Plant = require('../models/Plant');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.post('/add-plant', async (req, res) => {
    const { name, plantURL, price, categories, inStock } = req.body;
    try {

        if (!name || !plantURL || !price || !categories) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                receivedData: {
                    name,
                    plantURL,
                    price,
                    categories,
                } 
            });
        }

        const categoriesArray = Array.isArray(categories) ? categories : [categories];

        const newPlant = new Plant({
            name,
            plantURL,
            price: Number(price),
            categories: categoriesArray,
            inStock: inStock ?? true
        });
        await newPlant.save();

        res.status(201).json({
            message: 'Plant added successfully',
            plant: newPlant
        });
    } catch (err) {
        console.log('Error adding plant:', err);
        res.status(500).json({ error: 'Failed to add plant' });
    }
});

router.get('/plants', async (req, res) => {
    try{
        const plants = await Plant.find();
        res.status(200).json(plants);
        console.log('Plants fetched successfully!')
    } catch (err) {
        console.log('Error fetching plants:', err);
        res.status(500).json({ error: 'Failed to fetch plants' });
    }
})

module.exports = router;