// import { create } from 'zustand'

// const useUserStore = create((set) => ({
//   user: null,
//   token: null,
//   isAuthenticated: false,

//   setUser: ({ token, user }) => set({
//     user,
//     token,
//     isAuthenticated: true,
//   }),

//   logout: () => set({
//     user: null,
//     token: null,
//     isAuthenticated: false,
//   }),
  
// }))


import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useUserStore = create(devtools((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: ({ user, token }) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  
},
{ name: '🧠 UserStore' }
)));


export default useUserStore
