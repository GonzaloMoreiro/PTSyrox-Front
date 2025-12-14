export interface Sale {
  id: string;
  clientName: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  items?: {
    productName: string;
    quantity: number;
    price: number;
  }[];
}
