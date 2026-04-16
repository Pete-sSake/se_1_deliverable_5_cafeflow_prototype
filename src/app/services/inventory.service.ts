import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private inventoryItems: Ingredient[] = [
    { id: 1, name: 'Espresso Shot', cost: 0.50, unit: 'unit', stockAmount: 500, reorderThreshold: 100 },
    { id: 3, name: 'Milk', cost: 0.05, unit: 'ml', stockAmount: 5000, reorderThreshold: 1000 },
    { id: 4, name: 'Foam', cost: 0.03, unit: 'ml', stockAmount: 3000, reorderThreshold: 500 },
    { id: 5, name: 'Chocolate Syrup', cost: 0.15, unit: 'ml', stockAmount: 2000, reorderThreshold: 400 },
    { id: 6, name: 'Vanilla Syrup', cost: 0.12, unit: 'ml', stockAmount: 2500, reorderThreshold: 500 },
    { id: 7, name: 'Caramel Syrup', cost: 0.13, unit: 'ml', stockAmount: 2200, reorderThreshold: 450 },
    { id: 8, name: 'Whipped Cream', cost: 0.20, unit: 'grams', stockAmount: 1500, reorderThreshold: 300 },
    { id: 10, name: 'Sugar', cost: 0.03, unit: 'grams', stockAmount: 3000, reorderThreshold: 600 }
  ];

  private nextId = 11;

  getInventoryItems(): Ingredient[] {
    return [...this.inventoryItems];
  }

  getInventoryItem(id: number): Ingredient | undefined {
    return this.inventoryItems.find(item => item.id === id);
  }

  addInventoryItem(item: Omit<Ingredient, 'id'>): Ingredient {
    const newItem: Ingredient = { ...item, id: this.nextId++ };
    this.inventoryItems.push(newItem);
    return newItem;
  }

  updateInventoryItem(id: number, item: Ingredient): void {
    const index = this.inventoryItems.findIndex(i => i.id === id);
    if (index !== -1) {
      this.inventoryItems[index] = item;
    }
  }

  deleteInventoryItem(id: number): void {
    const index = this.inventoryItems.findIndex(i => i.id === id);
    if (index !== -1) {
      this.inventoryItems.splice(index, 1);
    }
  }
}
