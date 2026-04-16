import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Espresso',
      price: 3.50,
      promoPrice: 3.50,
      discountDollars: 0,
      discountPercentage: 0,
      active: true,
      promo: false,
      ingredientIds: [1, 2]
    },
    {
      id: 2,
      name: 'Cappuccino',
      price: 4.50,
      promoPrice: 4.05,
      discountDollars: 0.45,
      discountPercentage: 10,
      active: true,
      promo: true,
      ingredientIds: [1, 2, 3]
    }
  ];

  private ingredients: Ingredient[] = [
    { id: 1, name: 'Espresso Shot', cost: 0.50, unit: 'unit', stockAmount: 500, reorderThreshold: 100 },
    { id: 2, name: 'Water', cost: 0.01, unit: 'ml', stockAmount: 10000, reorderThreshold: 2000 },
    { id: 3, name: 'Milk', cost: 0.05, unit: 'ml', stockAmount: 5000, reorderThreshold: 1000 },
    { id: 4, name: 'Foam', cost: 0.03, unit: 'ml', stockAmount: 3000, reorderThreshold: 500 },
    { id: 5, name: 'Chocolate Syrup', cost: 0.15, unit: 'ml', stockAmount: 2000, reorderThreshold: 400 },
    { id: 6, name: 'Vanilla Syrup', cost: 0.12, unit: 'ml', stockAmount: 2500, reorderThreshold: 500 },
    { id: 7, name: 'Caramel Syrup', cost: 0.13, unit: 'ml', stockAmount: 2200, reorderThreshold: 450 },
    { id: 8, name: 'Whipped Cream', cost: 0.20, unit: 'grams', stockAmount: 1500, reorderThreshold: 300 },
    { id: 9, name: 'Ice', cost: 0.02, unit: 'grams', stockAmount: 8000, reorderThreshold: 1500 },
    { id: 10, name: 'Sugar', cost: 0.03, unit: 'grams', stockAmount: 3000, reorderThreshold: 600 }
  ];

  private nextId = 3;

  getMenuItems(): MenuItem[] {
    return [...this.menuItems];
  }

  getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  getMenuItem(id: number): MenuItem | undefined {
    return this.menuItems.find(item => item.id === id);
  }

  addMenuItem(item: Omit<MenuItem, 'id'>): MenuItem {
    const newItem: MenuItem = { ...item, id: this.nextId++ };
    this.menuItems.push(newItem);
    return newItem;
  }

  updateMenuItem(id: number, item: MenuItem): void {
    const index = this.menuItems.findIndex(i => i.id === id);
    if (index !== -1) {
      this.menuItems[index] = item;
    }
  }

  toggleActive(id: number): void {
    const item = this.menuItems.find(i => i.id === id);
    if (item) {
      item.active = !item.active;
    }
  }

  togglePromo(id: number): void {
    const item = this.menuItems.find(i => i.id === id);
    if (item) {
      item.promo = !item.promo;
    }
  }

  deleteMenuItem(id: number): void {
    const index = this.menuItems.findIndex(i => i.id === id);
    if (index !== -1) {
      this.menuItems.splice(index, 1);
    }
  }
}
