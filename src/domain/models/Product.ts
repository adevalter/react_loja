export interface Product {
  id: string;
  name: string;
  description: string;
  category?: string;
  department?: string;
  price: string;
  images: string[];
  material?: string;
  hasDiscount?: boolean;
  discountValue?: string;
  details?:details
}

export interface details{
   adjective?: string;
    material?: string;
}