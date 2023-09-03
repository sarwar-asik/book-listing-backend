### Book-listing-Backend :::



#### live url ::::  https://book-listing-backend.vercel.app

### Application Routes:

#### User

- api/v1/auth/signup (POST)  --done
- api/v1/users (GET)   --done
- api/v1/users/1ca1ab5e-be10-417d-a946-8d5accb38ca8 (Single GET) --done
- api/v1/users/1ca1ab5e-be10-417d-a946-8d5accb38ca8 (PATCH) --done
- api/v1/users/9dbe1f41-0660-499a-8b49-4ccadd5cb610 (DELETE)  --done
- api/v1/profile (GET)  --done

### Category

- api/v1/categories/create-category (POST) --done
- api/v1/categories (GET) --done
- api/v1/categories/9b016e05-9a9c-4ac4-b165-70c33f465269 (Single GET) --done
- api/v1/categories/28687700-6289-4b74-b920-70b0e0829d83 (PATCH) --done
- api/v1/categories/3e5c9ad0-e88a-483e-a9ba-558cf983e80f (DELETE) --done

### Books

- api/v1/books/create-book (POST)  --done
- api/v1/books (GET)  --done
- api/v1/books/9b016e05-9a9c-4ac4-b165-70c33f465269?page=1&size=3 (GET by categoryId) --done
- api/v1/books/9b016e05-9a9c-4ac4-b165-70c33f465269 (GET by id) --done
- api/v1/books/:id (PATCH)  --done
- api/v1/books/:id (DELETE)  --done

### Orders

- api/v1/orders/create-order (POST)  --done
- api/v1/orders (GET)  --done
- api/v1/orders/:b7b60c4d-b1be-47d9-ab0e-ef72da1dd85d (Get by orderId)  --done
