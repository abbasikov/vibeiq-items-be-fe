import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-item.html',
  styleUrl: './create-item.css',
})
export class CreateItem {
  name: string = '';
  description: string = '';

  constructor(
    private itemService: ItemService,
    private router: Router
  ) {}

  createItem(): void {
    if (!this.name.trim()) {
      alert('Name is required');
      return;
    }

    this.itemService.createItem({
      name: this.name,
      description: this.description
    }).subscribe(
      (item) => {
        console.log(item, 'item:::::::::');
        // Navigate to homepage after successful item creation
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error creating item:', error);
        alert('Failed to create item. Please try again.');
      }
    );
  }
}
