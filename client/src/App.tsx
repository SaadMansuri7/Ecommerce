import './App.css'
import { ProductDetails } from './components/ProductDetails'
import { Login } from './pages/Login'
import { ProductPage } from './pages/ProductPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Register } from './pages/Register'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Wishlist } from './pages/Wishlist.js'
import { Cart } from './pages/Cart.js'

function App() {

  const router = createBrowserRouter([
    { path: '/', element: <ProtectedRoute><ProductPage /></ProtectedRoute> },
    { path: 'productPage', element: <ProtectedRoute><ProductPage /></ProtectedRoute> },
    { path: 'product/:id', element: <ProductDetails /> },
    { path: 'wishlist', element: <Wishlist /> },
    { path: 'cart', element: <Cart /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
