import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  searchQuery?: string;
  categoryFilter?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  searchQuery,
  categoryFilter,
}) => {
  if (products.length === 0) {
    return (
      <div className="section-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', margin: 0 }}>
          {searchQuery
            ? `No products found for "${searchQuery}".`
            : categoryFilter
            ? `No products found in category "${categoryFilter}".`
            : 'No products available.'}
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
