import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';
import { CartProvider } from './context/CartContext';

const categories = ['All', 'Electronics', 'Accessories', 'Furniture', 'Kitchen'];

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isCartOpen, setIsCartOpen] = useState(false);

    // useCallback: Memoize handlers to prevent unnecessary re-renders of Navbar
    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    const toggleCart = useCallback(() => {
        setIsCartOpen(prev => !prev);
    }, []);

    return (
        <CartProvider>
            <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
                <Navbar
                    onOpenCart={toggleCart}
                    searchTerm={searchTerm}
                    onSearchChange={handleSearch}
                />

                <main className="container">
                    <header style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Our Collection</h2>

                        <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    style={{
                                        padding: '0.5rem 1.25rem',
                                        borderRadius: '99px',
                                        border: 'none',
                                        backgroundColor: selectedCategory === category ? 'var(--primary)' : 'var(--bg-card)',
                                        color: selectedCategory === category ? 'white' : 'var(--text-muted)',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </header>

                    <ProductList searchTerm={searchTerm} selectedCategory={selectedCategory} />
                </main>

                <CartModal isOpen={isCartOpen} onClose={toggleCart} />

                <footer style={{
                    marginTop: '4rem',
                    padding: '2rem 0',
                    borderTop: '1px solid var(--border)',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                }}>
                    <p>© 2026 LumoStore - React Hooks Demonstration</p>
                </footer>
            </div>
        </CartProvider>
    );
}

export default App;
