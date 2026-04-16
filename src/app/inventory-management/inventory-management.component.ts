import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InventoryService } from '../services/inventory.service';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-inventory-management',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './inventory-management.component.html',
  styleUrl: './inventory-management.component.scss',
})
export class InventoryManagementComponent implements OnInit {
  dataSource = new MatTableDataSource<Ingredient>([]);
  displayedColumns: string[] = ['name', 'cost', 'unit', 'stockAmount', 'reorderThreshold', 'actions'];
  editingItemId: number | null = null;
  isAddingNew = false;

  editForm = {
    name: '',
    cost: 0,
    unit: '',
    stockAmount: 0,
    reorderThreshold: 0
  };

  constructor(
    private inventoryService: InventoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInventoryItems();
  }

  loadInventoryItems(): void {
    this.dataSource.data = this.inventoryService.getInventoryItems();
  }

  addNewItem(): void {
    this.isAddingNew = true;
    this.editingItemId = null;
    this.editForm = {
      name: '',
      cost: 0,
      unit: '',
      stockAmount: 0,
      reorderThreshold: 0
    };
  }

  editItem(item: Ingredient): void {
    this.editingItemId = item.id;
    this.isAddingNew = false;
    this.editForm = {
      name: item.name,
      cost: item.cost || 0,
      unit: item.unit || '',
      stockAmount: item.stockAmount || 0,
      reorderThreshold: item.reorderThreshold || 0
    };
  }

  saveItem(): void {
    if (this.isAddingNew) {
      this.inventoryService.addInventoryItem({
        name: this.editForm.name,
        cost: this.editForm.cost,
        unit: this.editForm.unit,
        stockAmount: this.editForm.stockAmount,
        reorderThreshold: this.editForm.reorderThreshold
      });
    } else if (this.editingItemId !== null) {
      this.inventoryService.updateInventoryItem(this.editingItemId, {
        id: this.editingItemId,
        name: this.editForm.name,
        cost: this.editForm.cost,
        unit: this.editForm.unit,
        stockAmount: this.editForm.stockAmount,
        reorderThreshold: this.editForm.reorderThreshold
      });
    }
    this.cancelEdit();
    this.loadInventoryItems();
  }

  cancelEdit(): void {
    this.editingItemId = null;
    this.isAddingNew = false;
    this.editForm = {
      name: '',
      cost: 0,
      unit: '',
      stockAmount: 0,
      reorderThreshold: 0
    };
  }

  deleteItem(id: number): void {
    const dialogRef = this.dialog.open(DeleteInventoryConfirmationDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.inventoryService.deleteInventoryItem(id);
        this.loadInventoryItems();
      }
    });
  }

  isEditing(id: number): boolean {
    return this.editingItemId === id;
  }

  isFormValid(): boolean {
    return this.editForm.name.trim() !== '' &&
           this.editForm.cost > 0 &&
           this.editForm.unit.trim() !== '' &&
           this.editForm.stockAmount >= 0 &&
           this.editForm.reorderThreshold >= 0;
  }
}

@Component({
  selector: 'delete-inventory-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Deletion</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete this inventory item?</p>
      <p><strong>This action is permanent and cannot be recovered.</strong></p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Delete</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule]
})
export class DeleteInventoryConfirmationDialog {}
