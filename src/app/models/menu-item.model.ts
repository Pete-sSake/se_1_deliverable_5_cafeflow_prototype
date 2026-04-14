export interface MenuItem {
  id: number;
  name: string;
  price: number;
  promoPrice: number;
  discountDollars: number;
  discountPercentage: number;
  active: boolean;
  promo: boolean;
  ingredientIds: number[];
}
