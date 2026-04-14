import { Routes } from '@angular/router';
import { LoginComponent } from './login.component/login.component';
import { MenuManagementComponent } from './menu-management.component/menu-management.component';
import { MenuItemEditorComponent } from './menu-item-editor/menu-item-editor.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu-management', component: MenuManagementComponent },
  { path: 'menu-item-editor', component: MenuItemEditorComponent },
  { path: 'menu-item-editor/:id', component: MenuItemEditorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
