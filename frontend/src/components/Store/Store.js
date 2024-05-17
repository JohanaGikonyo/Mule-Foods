import create from 'zustand'

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


export const useItemStore = create((set) => ({
    product: [],
    setProduct: (item) => set({ product: item }),
    productDetailVisible: false,
    setProductDetailVisible: () => set((state) => ({ productDetailVisible: !state.productDetailVisible })),
}));