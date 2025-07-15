import { Routes } from '@angular/router';
import { ItemList } from './components/item-list/item-list';
import { ItemForm } from './components/item-form/item-form';
import { ItemDetail } from './components/item-detail/item-detail';

export const routes: Routes = [
  { path: '', component: ItemList },
  { path: 'create', component: ItemForm },
  { path: 'item/:id', component: ItemDetail },
];
