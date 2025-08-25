import axios from 'axios';
import React, { useState } from 'react';
import API_URL from '../config/api';

export default function AddPlants() {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        price: '',
        categories: [],
        inStock: true
    });
    const [categoryInput, setCategoryInput] = useState('');
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddCategory = (e) => {
        if (e.key === 'Enter' && categoryInput.trim()) {
            e.preventDefault();
            if (!formData.categories.includes(categoryInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    categories: [...prev.categories, categoryInput.trim()]
                }));
            }
            setCategoryInput('');
        }
    };

    const handleRemoveCategory = (category) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.filter(cat => cat !== category)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
        if (formData.categories.length === 0) newErrors.categories = 'At least one category is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {

            const plantData = {
                name: formData.name,
                plantURL: formData.url,
                price: Number(formData.price),
                categories: formData.categories,
                inStock: formData.inStock
            }

            const response = await axios.post(`${API_URL}/api/auth/add-plant`, plantData);
            console.log('Form submitted:', response.data);
            
            setFormData({
                name: '',
                url: '',
                price: '',
                categories: [],
                inStock: true
            });
            setCategoryInput('');
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 to-amber-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Add New Plant
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Plant Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                            placeholder="Enter plant name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Plant URL *
                        </label>
                        <input
                            type="text"
                            name="url"
                            value={formData.url}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border ${errors.url ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                            placeholder="Enter plant URL"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Price (₹) *
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                            placeholder="Enter price"
                            min="0"
                        />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Categories *
                        </label>
                        <input
                            type="text"
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            onKeyPress={handleAddCategory}
                            className={`w-full px-3 py-2 border ${errors.categories ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                            placeholder="Type and press Enter to add categories"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.categories.map((category, index) => (
                                <span
                                    key={index}
                                    className="bg-amber-100 px-2 py-1 rounded-md flex items-center gap-1"
                                >
                                    {category}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCategory(category)}
                                        className="text-amber-700 hover:text-amber-900"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories}</p>}
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                            In Stock
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        Add Plant
                    </button>
                </form>
            </div>
        </div>
    );
}
