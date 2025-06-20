import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { FC } from 'react';
import type { Product } from '../domain/models/Product';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItem extends Product {
  quantity: number;
}

interface DrawerCartProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onFinishPurchase: () => void;
}

const DrawerCart: FC<DrawerCartProps> = ({
  open,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onFinishPurchase,
}) => {
  const calculateProductPrice = (product: CartItem): number => {
    const price = Number(product.price);
    const unitPrice =
      product.hasDiscount && product.discountValue
        ? price * (1 - parseFloat(product.discountValue))
        : price;
    return unitPrice * product.quantity;
  };

  const total = cartItems.reduce(
    (sum, item) => sum + calculateProductPrice(item),
    0,
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 550,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">shopping cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box flexGrow={1} overflow="auto">
          {cartItems.length === 0 ? (
            <Typography variant="body1">Your cart is empty</Typography>
          ) : (
            <List>
              {cartItems.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <ListItemAvatar>
                      <Box
                        component="img"
                        src={
                          item.images && item.images[0]?.trim()
                            ? item.images[0]
                            : 'https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg'
                        }
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            'https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg';
                        }}
                        alt={item.name}
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          objectFit: 'cover',
                        }}
                      />
                    </ListItemAvatar>
                    <Box ml={2}>
                      <Typography fontWeight="bold">{item.name}</Typography>
                      <Typography variant="body2">
                        Unit price: $ {Number(item.price).toFixed(2)}
                      </Typography>
                      <Typography variant="body2">
                        Subtotal: $ {calculateProductPrice(item).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Controles de quantidade ao lado */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <Button
                      size="small"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button
                      size="small"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      +
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          mt={2}
        >
          <Typography variant="h6">
            {' '}
            Grand Total: $ {total.toFixed(2)}
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          gap={2}
          px={2}
          mt={2}
        >
          <Button variant="outlined" color="error" onClick={onClearCart}>
            Clean Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onFinishPurchase}
          >
            Finalize Purchase
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerCart;
