import type { Product } from "../domain/models/Product";
import apiUrl from "../api/service/api";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiUrl.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<[]> =>{
  try {
    const response = await apiUrl.get('categories')
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
