import { useEffect, useState } from 'react';
import api from '../api/service/api';
import apiUrl from '../api/service/api';
import type { Product } from '../domain/models/Product';
import { getCategories, getProducts } from './service';
import Button from '@mui/material/Button';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
} from '@mui/material';
import CardProduct from '../components/cardproduct';

const theme = createTheme({
  typography: {
    fontFamily: 'roboto',
  },
});

const Products = () => {
  const api = apiUrl;
  const [listProdutct, setListProducts] = useState<Product[] | null>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listProdutct!.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    async function list() {
      try {
        const list = await getProducts();
        console.log('Produtos', list);
        setListProducts(list);
      } catch {}
    }

    list();
  }, [apiUrl]);

  return (
    <Container>
      {/* Container principal dos cards */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: 2,
          p: 2,
        }}
      >
        {currentItems?.map((product) => (
          <CardProduct key={product.id} produto={product} />
        ))}
      </Box>

      {/* Paginação - fora do container flex dos cards */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          gap: 1,
        }}
      >
        {listProdutct &&
          Array.from(
            { length: Math.ceil(listProdutct.length / itemsPerPage) },
            (_, i) => (
              <Button
                key={i}
                variant="outlined"
                onClick={() => paginate(i + 1)}
                size="small"
              >
                {i + 1}
              </Button>
            ),
          )}
      </Box>
    </Container>
  );
};
export default Products;
