import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Image } from '../../models/item.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css',
})
export class ItemForm {
  itemForm: FormGroup;
  imagePreviews: Image[] = [];
  primaryImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onImageSelected(event: any): void {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        const image: Image = {
          id: uuidv4(),
          imageId: uuidv4(),
          url: url,
          isPrimary: false
        };
        this.imagePreviews.push(image);

        // Default first image as primary
        if (!this.primaryImage) {
          this.primaryImage = image.id;
          image.isPrimary = true;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  setPrimaryImage(imageId: string) {
    this.primaryImage = imageId;
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const { name, description } = this.itemForm.value;
      const newItem = {
        name,
        description
      };

      this.itemService.createItem(newItem).subscribe((createdItem) => {
        // Attach images
        for (let img of this.imagePreviews) {
          this.itemService.uploadImage(createdItem.id, this.base64ToFile(img.url, img.id)).subscribe((updated) => {
            this.router.navigate(['/'])
          });
        }

        // If no images: navigate immediately to the main items page
        if (this.imagePreviews.length === 0) {
          this.router.navigate(['/']);
        }
      });
    }
  }

  base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], `${filename}.png`, { type: mime });
  }
}
