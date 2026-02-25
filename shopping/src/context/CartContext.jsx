import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
    total: 0,
};

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            let newItems;

            if (existingItemIndex > -1) {
                newItems = [...state.items];
                newItems[existingItemIndex].quantity += 1;
            } else {
                newItems = [...state.items, { ...action.payload, quantity: 1 }];
            }

            return { ...state, items: newItems };
        }
        case 'REMOVE_FROM_CART': {
            const newItems = state.items.filter(item => item.id !== action.payload);
            return { ...state, items: newItems };
        }
        case 'UPDATE_QUANTITY': {
            const newItems = state.items.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            return { ...state, items: newItems };
        }
        case 'CLEAR_CART':
            return { ...state, items: [] };
        case 'CALCULATE_TOTAL': {
            const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            return { ...state, total };
        }
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // useEffect: Persistence to localStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
        dispatch({ type: 'CALCULATE_TOTAL' });
    }, [state.items]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
