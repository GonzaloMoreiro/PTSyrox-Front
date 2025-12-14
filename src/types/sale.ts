// export interface Sale {
//   id: string;
//   clientName: string;
//   orderNumber: string;
//   status: string;
//   paymentStatus: string;
//   total: number;
//   createdAt: string;
//   items?: {
//     productName: string;
//     quantity: number;
//     price: number;
//   }[];
// }
export interface Sale {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  client: {
    id: string;
    name: string;
  };
  items?: {
    productName: string;
    quantity: number;
    price: number;
  }[];
}
