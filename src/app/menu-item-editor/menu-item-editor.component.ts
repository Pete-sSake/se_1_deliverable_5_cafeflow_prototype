import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu-item.model';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-menu-item-editor',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule
  ],
  templateUrl: './menu-item-editor.component.html',
  styleUrl: './menu-item-editor.component.scss',

})
export class MenuItemEditorComponent implements OnInit {
  isEditMode = false;
  itemId?: number;

  name = '';
  price = 0;
  promoPrice = 0;
  discountDollars = 0;
  discountPercentage = 0;
  active = false;
  promo = false;

  allIngredients: Ingredient[] = [];
  selectedIngredientIds = new Set<number>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.allIngredients = this.menuService.getIngredients();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.itemId = parseInt(id, 10);
      this.loadMenuItem(this.itemId);
    }
  }

  loadMenuItem(id: number): void {
    const item = this.menuService.getMenuItem(id);
    if (item) {
      this.name = item.name;
      this.price = item.price;
      this.promoPrice = item.promoPrice;
      this.discountDollars = item.discountDollars;
      this.discountPercentage = item.discountPercentage;
      this.active = item.active;
      this.promo = item.promo;
      this.selectedIngredientIds = new Set(item.ingredientIds);
    }
  }

  toggleIngredient(ingredientId: number): void {
    if (this.selectedIngredientIds.has(ingredientId)) {
      this.selectedIngredientIds.delete(ingredientId);
    } else {
      this.selectedIngredientIds.add(ingredientId);
    }
  }

  isIngredientSelected(ingredientId: number): boolean {
    return this.selectedIngredientIds.has(ingredientId);
  }

  removeIngredient(ingredientId: number): void {
    this.selectedIngredientIds.delete(ingredientId);
  }

  getSelectedIngredients(): Ingredient[] {
    return this.allIngredients.filter(ing => this.selectedIngredientIds.has(ing.id));
  }

  onPriceChange(): void {
    this.recalculateFromPrice();
  }

  onPromoPriceChange(): void {
    this.recalculateFromPromoPrice();
  }

  onDiscountDollarsChange(): void {
    this.recalculateFromDiscountDollars();
  }

  onDiscountPercentageChange(): void {
    this.recalculateFromDiscountPercentage();
  }

  private recalculateFromPrice(): void {
    this.promoPrice = this.price - this.discountDollars;
    if (this.promoPrice < 0) this.promoPrice = 0;
  }

  private recalculateFromPromoPrice(): void {
    this.discountDollars = this.price - this.promoPrice;
    if (this.discountDollars < 0) this.discountDollars = 0;
    this.discountPercentage = this.price > 0 ? (this.discountDollars / this.price) * 100 : 0;
  }

  private recalculateFromDiscountDollars(): void {
    this.promoPrice = this.price - this.discountDollars;
    if (this.promoPrice < 0) this.promoPrice = 0;
    this.discountPercentage = this.price > 0 ? (this.discountDollars / this.price) * 100 : 0;
  }

  private recalculateFromDiscountPercentage(): void {
    this.discountDollars = (this.price * this.discountPercentage) / 100;
    this.promoPrice = this.price - this.discountDollars;
    if (this.promoPrice < 0) this.promoPrice = 0;
  }

  save(): void {
    const item: MenuItem = {
      id: this.itemId || 0,
      name: this.name,
      price: this.price,
      promoPrice: this.promoPrice,
      discountDollars: this.discountDollars,
      discountPercentage: this.discountPercentage,
      active: this.active,
      promo: this.promo,
      ingredientIds: Array.from(this.selectedIngredientIds)
    };

    if (this.isEditMode && this.itemId) {
      this.menuService.updateMenuItem(this.itemId, item);
    } else {
      this.menuService.addMenuItem(item);
    }

    this.router.navigate(['/menu-management']);
  }

  cancel(): void {
    this.router.navigate(['/menu-management']);
  }
}
