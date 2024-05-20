import create from 'zustand'
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

export const cartItems = create((set) => ({
    count: 0,
    items: [],
    addItems: (newItem) => set((state) => {
        const existingItem = state.items.find(item => item.itemName === newItem.itemName);
        if (existingItem) {
            return {
                items: state.items.map(item =>
                    item.itemName === newItem.itemName
                        ? { ...item, itemQuantity: item.itemQuantity + newItem.itemQuantity, itemCost: item.itemCost + newItem.itemCost }
                        : item
                )
            };
        }
        return { items: [...state.items, newItem] };
    }),
    updateItemQuantity: (itemName, change) => set((state) => {
        const updatedItems = state.items.map(item =>
            item.itemName === itemName
                ? { ...item, itemQuantity: item.itemQuantity + change, itemCost: item.itemPrice * (item.itemQuantity + change) }
                : item
        ).filter(item => item.itemQuantity > 0); // Filter out items with zero quantity
        return { items: updatedItems };
    }),
    removeItem: (itemName) => set((state) => ({
        items: state.items.filter(item => item.itemName !== itemName)
    })),

    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count > 0 ? state.count - 1 : 0 }))
}));




export const useAuthStore = create(
    persist(
        (set, get) => ({
            token: null,
            setToken: (token) => {
                set({ token });
            },
            clearToken: () => {
                set({ token: null });
            },
            isAuthenticated: () => {
                const token = get().token;
                if (token) {
                    try {
                        const decodedToken = jwtDecode(token);
                        return !!decodedToken;
                    } catch (error) {
                        console.error('Invalid token:', error);
                        return false;
                    }
                }
                return false;
            },
        }),
        {
            name: 'auth-storage', // unique name
            getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
        }
    )
);