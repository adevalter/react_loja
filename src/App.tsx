import React, { useState } from 'react';

import Navbar from './components/navbar';
import Sidebar from './components/SideBar';
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material';
import { green, purple } from '@mui/material/colors';
import Feed from './components/Feeds';
import type { Product } from './domain/models/Product';
import DrawerCart from './components/DrawerCart';

interface CartItem extends Product {
  quantity: number;
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
  });
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };
  const handleClearCart = () => {
    setCartItems([]);
  };
  const handleFinishPurchase = () => {
    if (cartItems.length === 0) {
      alert('O carrinho está vazio!');
      return;
    }

    alert('Compra finalizada com sucesso!');
    setCartItems([]);
    setIsCartOpen(false);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={'background.default'} color={'text.primary'}>
        <Navbar
          onSearch={setSearchTerm}
          cartCount={cartItems.length}
          onCartClick={handleToggleCart}
        />
        <DrawerCart
          open={isCartOpen}
          onClose={handleToggleCart}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onFinishPurchase={handleFinishPurchase}
        />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />
          <Feed searchTerm={searchTerm} onAddToCart={handleAddToCart} />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default App;
