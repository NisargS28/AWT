import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

function CartModal({ isOpen, onClose }) {
    const { state, dispatch } = useCart();

    if (!isOpen) return null;

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQty } });
    };

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end'
        }} onClick={onClose}>
            <div
                className="glass-morphism"
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem',
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                    animation: 'slideIn 0.3s ease-out'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Your Cart</h2>
                    <X size={24} style={{ cursor: 'pointer' }} onClick={onClose} />
                </div>

                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem' }}>
                    {state.items.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>
                            <ShoppingBag size={64} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {state.items.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{item.name}</h4>
                                        <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                style={{ border: '1px solid var(--border)', background: 'none', borderRadius: '4px', padding: '2px' }}>
                                                <Minus size={14} />
                                            </button>
                                            <span style={{ fontSize: '0.9rem' }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                style={{ border: '1px solid var(--border)', background: 'none', borderRadius: '4px', padding: '2px' }}>
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} style={{ border: 'none', background: 'none', color: '#ef4444' }}>
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {state.items.length > 0 && (
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                            <span>Total:</span>
                            <span>${state.total.toFixed(2)}</span>
                        </div>
                        <button style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                        }}>
                            Checkout
                        </button>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
        </div>
    );
}

export default CartModal;
