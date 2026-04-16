export interface Ingredient {
  id: number;
  name: string;
  cost?: number;
  unit?: string;
  stockAmount?: number;
  reorderThreshold?: number;
}
