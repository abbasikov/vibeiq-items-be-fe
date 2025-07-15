export interface Image {
    id: string;
    isPrimary?: boolean;
    imageId: string,
    url: string;
  }
  
  export interface Item {
    id: string;
    name: string;
    description: string;
    images: Image[];
    primaryImage?: string;
  }
  