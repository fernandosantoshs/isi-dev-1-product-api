export interface Discount {
  type: string;
  value: number;
  applied_at: Date;
}
export interface GetProductUseCaseRequest {
  id: number;
}
export interface GetProductUseCaseResponse {
  id: number;
  name: string;
  description?: string;
  stock: number;
  is_out_of_stock: boolean;
  price: number;
  finalPrice: number;
  discount: Discount | null;
  hasCouponApplied: boolean;
  created_at: Date;
  updated_at?: Date;
}
