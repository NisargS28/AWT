import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

function ProductList({ searchTerm, selectedCategory }) {
    // useMemo: Filter and sort products only when necessary
    const filteredProducts = useMemo(() => {
        console.log('Filtering products...');
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    if (filteredProducts.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                <p>No products found matching your search.</p>
            </div>
        );
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
            padding: '1rem 0'
        }}>
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductList;
