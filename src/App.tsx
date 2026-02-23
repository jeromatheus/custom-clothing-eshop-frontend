import { Routes, Route, Navigate } from 'react-router-dom'; 
import PurchasePage from './pages/PurchasePage';
import { CartContextProvider } from './context/CartContext';
import { FavoritesContextProvider } from './context/FavoritesContext';
import 'react-loading-skeleton/dist/skeleton.css';
import MainLayout from './layout/MainLayout'; 

function App() {
  const DEFAULT_PRODUCT_ID = "22222222-0000-0000-0000-00000000000A";

  return (
    <FavoritesContextProvider>
      <CartContextProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to={`/product/${DEFAULT_PRODUCT_ID}`} replace />} />
            <Route path="/product/:id" element={<PurchasePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </CartContextProvider>
    </FavoritesContextProvider>
  );
}

export default App;