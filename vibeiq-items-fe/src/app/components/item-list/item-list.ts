import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList {
  items: any[] = [];
  apiBaseUrl = 'http://localhost:3000'; // Default API URL

  constructor(private itemService: ItemService, private router: Router) {
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  viewItem(id: string) {
    this.router.navigate(['/item', id]);
  }

  getPrimaryImageUrl(item: any): string {
    if (!item.images || item.images.length === 0) {
      return 'assets/placeholder-image.svg'; // Default placeholder SVG
    }
    
    // Find the primary image
    const primaryImage = item.images.find((img: any) => img.isPrimary);
    
    // If there's a primary image, return its URL, otherwise return the first image
    if (primaryImage) {
      return this.apiBaseUrl + primaryImage.url;
    } else if (item.images[0]) {
      return this.apiBaseUrl + item.images[0].url;
    }
    
    return 'assets/placeholder-image.svg';
  }
}
