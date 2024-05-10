import create from 'zustand'

export const useUser = create((set) => ({
    userData: [],
    setUser: (user) => { set(() => ({ userData: [user] })) }
}))