import React from 'react';

const SearchFilter = ({ 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    allCategories 
}) => {
    return (
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <input
                type="text"
                placeholder="Search plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 flex-1"
            />
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white cursor-pointer"
            >
                <option value="">All Categories</option>
                {allCategories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchFilter;
