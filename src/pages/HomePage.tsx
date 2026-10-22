import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductGrid } from '../components/ProductGrid';

export const HomePage: React.FC = () => {
  const { products, searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } = useShop();

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

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <div id="products-results">
      {searchQuery || selectedCategory ? (
        <div style={{ marginBottom: '1.25rem' }}>
          <h2>Products</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {searchQuery && (
              <p style={{ margin: '0.25rem 0' }}>
                Search: <strong>{searchQuery}</strong>
              </p>
            )}
            {selectedCategory && (
              <p style={{ margin: '0.25rem 0' }}>
                Category: <strong>{selectedCategory}</strong>
              </p>
            )}
            <button
              type="button"
              onClick={clearFilters}
              className="btn-pill"
              style={{ color: '#2563eb', borderColor: '#2563eb', fontSize: '0.8rem', padding: '0.2rem 0.6rem' }}
            >
              Clear Filter
            </button>
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2>Featured products</h2>
          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Showing {filteredProducts.length} items
          </span>
        </div>
      )}

      <ProductGrid
        products={filteredProducts}
        searchQuery={searchQuery}
        categoryFilter={selectedCategory}
      />
    </div>
  );
};
