import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductGrid } from '../components/ProductGrid';

export const ProductsPage: React.FC = () => {
  const {
    products,
    categories,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
  } = useShop();

  const filteredProducts = products.filter((p) => {
    const matchesQuery =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      p.category.toLowerCase() === selectedCategory.toLowerCase() ||
      p.categoryId.toString() === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div id="products-results">
      <div style={{ marginBottom: '1.5rem' }}>
        <h2>All Products</h2>
        <p style={{ color: '#4b5563', margin: '0.25rem 0 1rem' }}>
          Explore our range of smartphones, laptops, electronics, skincare, and fresh florals.
        </p>

        {/* Category quick pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            className={`btn-pill ${!selectedCategory ? 'primary' : ''}`}
            style={{
              color: !selectedCategory ? '#ffffff' : '#374151',
              borderColor: !selectedCategory ? '#2563eb' : '#d1d5db',
            }}
            onClick={() => setSelectedCategory('')}
          >
            All Categories
          </button>
          {categories.map((c) => {
            const isSelected = selectedCategory.toLowerCase() === c.name.toLowerCase();
            return (
              <button
                key={c.id}
                type="button"
                className={`btn-pill ${isSelected ? 'primary' : ''}`}
                style={{
                  color: isSelected ? '#ffffff' : '#374151',
                  borderColor: isSelected ? '#2563eb' : '#d1d5db',
                }}
                onClick={() => setSelectedCategory(c.name)}
              >
                {c.name}
              </button>
            );
          })}
          {searchQuery && (
            <button
              type="button"
              className="btn-pill"
              style={{ color: '#dc2626', borderColor: '#fca5a5', fontSize: '0.85rem' }}
              onClick={() => setSearchQuery('')}
            >
              Clear Search: "{searchQuery}"
            </button>
          )}
        </div>
      </div>

      <ProductGrid
        products={filteredProducts}
        searchQuery={searchQuery}
        categoryFilter={selectedCategory}
      />
    </div>
  );
};
