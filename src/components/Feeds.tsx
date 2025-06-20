import { Box, Stack, Skeleton, Button } from '@mui/material';
import React, { useEffect, useState, type FC } from 'react';

import { getProducts } from '../products/service';
import apiUrl from '../api/service/api';
import type { Product } from '../domain/models/Product';
import CardProduct from './cardproduct';
interface FeedPros {
  searchTerm: string;
  onAddToCart: (product: Product) => void;
}
const Feed: FC<FeedPros> = ({ searchTerm, onAddToCart }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Buscar produtos
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filtro aplicado com base no searchTerm
  const filteredItems = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Reseta para a página 1 ao digitar na busca
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Paginação aplicada aos itens filtrados
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          {/* Cards dos produtos */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              gap: 2,
              p: 2,
            }}
          >
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <CardProduct
                  key={product.id}
                  produto={product}
                  onAddToCart={onAddToCart}
                />
              ))
            ) : (
              <Box p={2}>Nenhum produto encontrado.</Box>
            )}
          </Box>

          {/* Paginação */}
          {filteredItems.length > itemsPerPage && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
                gap: 1,
              }}
            >
              {Array.from(
                { length: Math.ceil(filteredItems.length / itemsPerPage) },
                (_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? 'contained' : 'outlined'}
                    onClick={() => paginate(i + 1)}
                    size="small"
                  >
                    {i + 1}
                  </Button>
                ),
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Feed;
