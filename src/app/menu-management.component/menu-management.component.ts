import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu-item.model';

@Component({
  selector: 'app-menu-management',
  imports: [
    CommonModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './menu-management.component.html',
  styleUrl: './menu-management.component.scss',
})
export class MenuManagementComponent implements OnInit {
  dataSource = new MatTableDataSource<MenuItem>([]);
  displayedColumns: string[] = ['name', 'price', 'promoPrice', 'active', 'promo', 'actions'];

  constructor(
    private menuService: MenuService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.dataSource.data = this.menuService.getMenuItems();
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

  deleteItem(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.menuService.deleteMenuItem(id);
        this.loadMenuItems();
      }
    });
  }
}

@Component({
  selector: 'delete-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Deletion</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete this menu item?</p>
      <p><strong>This action is permanent and cannot be recovered.</strong></p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Delete</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule]
})
export class DeleteConfirmationDialog {}
