import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
     
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
        <Toaster richColors position="bottom-right" />
        
      </Elements>
    </Provider>
   
  </StrictMode>,
)
