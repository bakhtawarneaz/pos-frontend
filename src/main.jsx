import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './router/router';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@styles/main.css'

const queryClient = new QueryClient();

const toastOptions = {
  style: {
      fontFamily: `"Poppins", sans-serif`, 
  }
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" toastOptions={toastOptions} />
        <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
