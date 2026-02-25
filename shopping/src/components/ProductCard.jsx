import React from 'react';
import { Plus, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = React.memo(({ product }) => {
    const { dispatch } = useCart();

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <div className="glass-morphism" style={{
            borderRadius: '16px',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'var(--glass)',
                    padding: '4px 12px',
                    borderRadius: '99px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backdropFilter: 'blur(4px)'
                }}>
                    {product.category}
                </div>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    marginBottom: '1.5rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flex: 1
                }}>
                    {product.description}
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto'
                }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        style={{
                            background: 'var(--text-main)',
                            color: 'white',
                            border: 'none',
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ProductCard;
