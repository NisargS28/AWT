import React from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Navbar({ onOpenCart, searchTerm, onSearchChange }) {
    const { state } = useCart();
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="glass-morphism" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '1rem 0',
            marginBottom: '2rem'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Menu size={24} style={{ cursor: 'pointer' }} />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        LumoStore
                    </h1>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    flex: 1,
                    justifyContent: 'center',
                    maxWidth: '500px'
                }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Search size={18} style={{
                            position: 'absolute',
                            left: '12px',
                            color: 'var(--text-muted)'
                        }} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.6rem 1rem 0.6rem 2.5rem',
                                borderRadius: '99px',
                                border: '1px solid var(--border)',
                                outline: 'none',
                                fontSize: '0.9rem'
                            }}
                        />
                    </div>
                </div>

                <div style={{ position: 'relative', cursor: 'pointer' }} onClick={onOpenCart}>
                    <ShoppingCart size={24} />
                    {itemCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: 'var(--accent)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 'bold'
                        }}>
                            {itemCount}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
