import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.css',
})
export class ItemDetail {
  item: Item | undefined;
  itemId: string = '';
  imageBaseUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {
    this.imageBaseUrl = itemService.imageBaseUrl;
  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id')!;
    this.itemService.getItem(this.itemId).subscribe((data) => {
      this.item = data;
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.itemId) {
      this.itemService
        .uploadImage(this.itemId, file)
        .subscribe((updatedItem) => {
          this.item = updatedItem;
        });
    }
  }

  setPrimary(imageId: string): void {
    console.log(imageId)
    this.itemService
      .markPrimaryImage(this.itemId, imageId)
      .subscribe((updatedItem) => {
        this.item = updatedItem;
      });
  }
}
