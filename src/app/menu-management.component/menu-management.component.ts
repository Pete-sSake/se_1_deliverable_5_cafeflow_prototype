import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu-item.model';

@Component({
  selector: 'app-menu-management',
  imports: [
    CommonModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './menu-management.component.html',
  styleUrl: './menu-management.component.scss',
})
export class MenuManagementComponent implements OnInit {
  menuItems: MenuItem[] = [];
  displayedColumns: string[] = ['name', 'price', 'promoPrice', 'active', 'promo', 'actions'];

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuItems = this.menuService.getMenuItems();
  }

  addNewItem(): void {
    this.router.navigate(['/menu-item-editor']);
  }

  editItem(id: number): void {
    this.router.navigate(['/menu-item-editor', id]);
  }

  toggleActive(id: number): void {
    this.menuService.toggleActive(id);
    this.loadMenuItems();
  }

  togglePromo(id: number): void {
    this.menuService.togglePromo(id);
    this.loadMenuItems();
  }
}
