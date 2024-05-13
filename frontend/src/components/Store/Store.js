import create from 'zustand'

export const cartItems = create((set) => ({
    count: 0,
    items: [],
    addItems: (item) => set((state) => ({ items: [item, ...state.items] })),
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 }))
}))