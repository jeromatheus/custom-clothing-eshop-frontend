import { Routes, Route, Navigate } from 'react-router-dom'; 
import PurchasePage from './pages/PurchasePage';
import { CartContextProvider } from './context/CartContext';
import { FormContextProvider } from './context/FormContext';
import { FavoritesContextProvider } from './context/FavoritesContext';
import MainLayout from './layout/MainLayout'; 

function App() {
  const DEFAULT_PRODUCT_ID = "fcab721f-289d-405a-8377-20bfd85b4efa";

  return (
    <FavoritesContextProvider>
      <CartContextProvider>
        <FormContextProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Navigate to={`/product/${DEFAULT_PRODUCT_ID}`} replace />} />
              <Route path="/product/:id" element={<PurchasePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        </FormContextProvider>
      </CartContextProvider>
    </FavoritesContextProvider>
  );
}

export default App;