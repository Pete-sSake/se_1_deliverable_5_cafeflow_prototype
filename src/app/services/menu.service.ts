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
    { id: 1, name: 'Espresso Shot' },
    { id: 2, name: 'Water' },
    { id: 3, name: 'Milk' },
    { id: 4, name: 'Foam' },
    { id: 5, name: 'Chocolate Syrup' },
    { id: 6, name: 'Vanilla Syrup' },
    { id: 7, name: 'Caramel Syrup' },
    { id: 8, name: 'Whipped Cream' },
    { id: 9, name: 'Ice' },
    { id: 10, name: 'Sugar' }
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
