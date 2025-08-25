import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchFilter from '../Components/SearchFilter';
import API_URL from '../config/api';

const Plants = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/api/auth/plants`)
            .then(res => {
                const sanitizedPlants = res.data.map(plant => ({
                    ...plant,
                    categories: plant.categories || [],
                    price: plant.price || 0,
                    inStock: typeof plant.inStock === 'boolean' ? plant.inStock : true,
                    plantURL: plant.plantURL || 'https://via.placeholder.com/400x300?text=Plant+Image'
                }));
                setPlants(sanitizedPlants);
            })
            .catch(err => {
                console.error('Error fetching plants:', err);
                setError('Failed to load plants');
            })
            .finally(() => setLoading(false));
    }, []);

    const allCategories = [...new Set(plants.flatMap(plant => plant.categories || []))];

    const filteredPlants = plants.filter(plant => {
        const matchesSearch = plant.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || (plant.categories || []).includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
                <div className="text-xl text-amber-600">Loading plants...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 to-amber-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Our Plants Collection
                </h1>

                <SearchFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    allCategories={allCategories}
                />

                {filteredPlants.length === 0 && (
                    <div className="text-center text-gray-600 my-8">
                        No plants found matching your criteria
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPlants.map((plant) => (
                        <div
                            key={plant._id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className='aspect-w-4 aspect-h-3 w-full'>
                                <img
                                    src={plant.plantURL}
                                    alt={plant.name}
                                    className="w-full h-48 object-cover object-center"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    {plant.name || 'Unnamed Plant'}
                                </h2>
                                <p className="text-2xl font-bold text-amber-600 mb-4">
                                    ₹{plant.price?.toLocaleString('en-IN') || '0'}
                                </p>
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {(plant.categories || []).map((category, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-amber-100 text-amber-800 text-sm rounded-md"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className={`text-sm font-medium ${plant.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                    {plant.inStock ? 'In Stock' : 'Out of Stock'}
                                </div>
                                <button
                                    className={`mt-4 w-full py-2 px-4 rounded-md text-white transition-colors duration-200
                                        ${plant.inStock
                                            ? 'bg-amber-500 hover:bg-amber-600 cursor-pointer'
                                            : 'bg-gray-400 cursor-not-allowed'}`}
                                    disabled={!plant.inStock}
                                >
                                    {plant.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plants;