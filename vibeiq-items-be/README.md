# VibeIQ Items Backend API

## Overview

This is a NestJS-based RESTful API for managing an item catalog. The application allows users to create, retrieve, and manage items with their associated images. It's designed with scalability and performance in mind, making it suitable for handling large datasets.

## Features

- **Item Management**: Create and retrieve items with name and description
- **Image Handling**: Upload and associate multiple images with items
- **Primary Image**: Mark specific images as primary for items
- **Pagination**: Efficient pagination for handling large datasets
- **MongoDB Integration**: NoSQL database for flexible data storage

## System Architecture


```
             ┌──────────────┐
             │   Angular    │
             │   Frontend   │
             └──────┬───────┘
                    │
       HTTP (REST)  ▼
             ┌──────────────┐
             │   NestJS     │
             │  API Server  │
             └────┬────┬────┘
         mongoDB │    │ AWS S3 / Local
                  ▼    ▼
             ┌──────────────┐
             │   Items DB   │
             │   + Images   │
             └──────────────┘

```

## Item Model

The `Item` model represents an item in the catalog and is defined as follows:

- **name** (`string`, required): The name of the item.
- **description** (`string`, optional): A description of the item.
- **images** (`Array` of objects): List of images associated with the item. Each image object contains:
  - **url** (`string`, required): The URL/path to the image file.
  - **isPrimary** (`boolean`, default: false): Whether this image is the primary image for the item.
  - **imageId** (`string`, required): Unique identifier for the image.
- **Timestamps**: Automatically managed `createdAt` and `updatedAt` fields.


Example (JSON):
```json
{
  "id": "item123",
  "name": "Sample Item",
  "description": "This is a sample item.",
  "images": [
    {
      "url": "/uploads/abc123.jpg",
      "isPrimary": true,
      "imageId": "img1"
    },
    {
      "url": "/uploads/def456.jpg",
      "isPrimary": false,
      "imageId": "img2"
    }
  ],
  "createdAt": "2024-06-01T12:00:00.000Z",
  "updatedAt": "2024-06-01T12:00:00.000Z"
}
```

The application follows a modular architecture with the following components:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Implement business logic
- **DTOs**: Define data transfer objects for validation
- **Schemas**: Define MongoDB document structures

## API Endpoints

| Method | Endpoint                          | Description                  |
| ------ | --------------------------------- | ---------------------------- |
| POST   | /api/items                        | Create a new item            |
| GET    | /api/items                        | List all items (paginated)   |
| GET    | /api/items/:id                    | Get item by ID               |
| POST   | /api/items/:id/images             | Upload new image for an item |
| PUT    | /api/items/:id/images/:imageId/primary | Mark image as primary    |

## Prerequisites

- Node.js (v14 or higher)
- npm
- MongoDB (local or cloud-based like MongoDB Atlas)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
```

## Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

## API Usage Examples

### Create a New Item

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Sample Item","description":"This is a sample item"}'
```

### Get All Items (Paginated)

```bash
curl -X GET "http://localhost:3000/api/items?page=1&limit=10"
```

### Upload an Image for an Item

```bash
curl -X POST http://localhost:3000/api/items/item_id/images \
  -H "Content-Type: multipart/form-data" \
  -F "image=@/path/to/image.jpg"
```

### Mark an Image as Primary

```bash
curl -X PUT http://localhost:3000/api/items/item_id/images/image_id/primary
```

## Performance Considerations

- **Pagination**: Implemented for handling large datasets efficiently
- **Indexing**: MongoDB text indexes for faster queries
- **Compression**: Response compression for reduced bandwidth
- **Security Headers**: Helmet for secure HTTP headers

## Scalability

The application is designed to scale horizontally. Key scalability features include:

- **Database Indexing**: Optimized for large datasets
- **Connection Pooling**: Efficient database connection management
- **Stateless Design**: Facilitates horizontal scaling

# Tradeoffs & Production Considerations

This project was developed as an assignment, so certain tradeoffs were made to focus on core functionality and clarity:

- **Simplified Error Handling**: Error responses are basic and may not cover all edge cases. In a production system, more robust error handling, logging, and user-friendly error messages would be implemented.
- **Authentication & Authorization**: The current implementation does not include user authentication or role-based access control. For a production backend, secure authentication (e.g., JWT, OAuth) and granular authorization would be essential.
- **Validation**: While DTOs provide basic validation, more comprehensive validation and sanitization would be required to prevent security vulnerabilities.
- **File Storage**: Images are likely stored locally for simplicity. In production, images should be stored in a scalable object storage service (e.g., AWS S3, Google Cloud Storage) with CDN integration for performance.
- **Rate Limiting & Security**: The assignment omits rate limiting, brute-force protection, and advanced security headers. Production systems should implement these to prevent abuse and enhance security.
- **Testing**: Only basic tests are included. A production-ready backend would require extensive unit, integration, and end-to-end tests, as well as CI/CD integration.
- **Monitoring & Observability**: No monitoring or alerting is set up. Production systems should include logging, metrics, and alerting (e.g., with Prometheus, Grafana, Sentry).
- **Environment Management**: The assignment uses a single environment file. Production systems should support multiple environments (dev, staging, prod) with secure secrets management.
- **API Documentation**: While not included here, production APIs should provide interactive documentation (e.g., Swagger/OpenAPI) for easier integration.

If this were a fully production-ready backend, these areas would be addressed to ensure security, scalability, maintainability, and a better developer and user experience.
