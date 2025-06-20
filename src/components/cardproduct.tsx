import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import type { Product } from '../domain/models/Product';
import type { FC } from 'react';

interface CardProductProps {
  produto: Product;
  onAddToCart: (product: Product) => void;
}
const CardProduct: FC<CardProductProps> = ({ produto, onAddToCart }) => {
  const calculateDiscountPrice = (price: number, discountValue: string) => {
    return price * (1 - parseFloat(discountValue));
  };
  return (
    <>
      <Card sx={{ maxWidth: 345, m: 1, flex: '1 0 auto' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="120"
            image={
              produto.images && produto.images.length > 0
                ? produto.images[0]
                : 'https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg'
            }
            alt="green iguana"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                'https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg'; // Fallback quando quebra
              target.onerror = null; // Previne loop infinito se o fallback também quebrar
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {produto.name}
            </Typography>
            {/* Preço com destaque */}
            {produto.hasDiscount && produto.discountValue ? (
              <>
                {/* Preço com desconto (destacado) */}
                <Typography variant="h5" color="primary" fontWeight="bold">
                  {calculateDiscountPrice(
                    Number(produto.price),
                    produto.discountValue,
                  ).toFixed(2)}
                </Typography>

                {/* Preço original (riscado) */}
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {produto.price}
                </Typography>

                {/* Chip com % de desconto */}
                <Chip
                  label={`${(parseFloat(produto.discountValue) * 100).toFixed(
                    0,
                  )}% OFF`}
                  color="error"
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </>
            ) : (
              <>
                {/* Caso não tenha desconto, mostra apenas o preço normal */}
                <Typography variant="h5" color="text.primary" fontWeight="bold">
                  {produto.price}
                </Typography>
              </>
            )}

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {produto.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => onAddToCart(produto)}
          >
            Buy
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default CardProduct;
