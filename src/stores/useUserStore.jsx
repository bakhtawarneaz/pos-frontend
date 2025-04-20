import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        setUser: ({ user, token }) => set({ user, token, isAuthenticated: true }),

        logout: () =>
          set({ user: null, token: null, isAuthenticated: false }),
      }),
      {
        name: 'user-store',
      }
    ),
    { name: '🧠 POS' }
  )
);

export default useUserStore;
