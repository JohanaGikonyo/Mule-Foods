import create from 'zustand'

export const cartItems = create((set) => ({
    count: 1,
    setCount: () => set((state) => ({ count: state.count }))

}))