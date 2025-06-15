const request = require('supertest');
const { createClient } = require('@supabase/supabase-js');
const app = require('../server');
const { generateToken } = require('../utils/auth');

// Mock Supabase client
jest.mock('@supabase/supabase-js');

describe('Products API', () => {
  let farmerToken;
  let consumerToken;
  let adminToken;
  let mockSupabase;

  const mockProduct = {
    name: 'Organic Tomatoes',
    description: 'Fresh organic tomatoes from our farm',
    price: 4.99,
    unit: 'kg',
    quantity: 100,
    category: 'vegetables',
    tags: ['organic', 'fresh'],
    images: ['https://example.com/tomatoes.jpg'],
  };

  beforeAll(async () => {
    // Create test tokens
    farmerToken = generateToken({ id: 'farmer-123', role: 'farmer' });
    consumerToken = generateToken({ id: 'consumer-123', role: 'consumer' });
    adminToken = generateToken({ id: 'admin-123', role: 'admin' });

    // Mock Supabase client
    mockSupabase = {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
      data: null,
      error: null,
    };

    createClient.mockReturnValue(mockSupabase);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase.data = null;
    mockSupabase.error = null;
  });

  describe('POST /api/products', () => {
    it('should create a new product when user is a farmer', async () => {
      mockSupabase.data = { id: 'product-123', ...mockProduct };
      
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${farmerToken}`)
        .send(mockProduct);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', 'product-123');
      expect(mockSupabase.from).toHaveBeenCalledWith('products');
      expect(mockSupabase.insert).toHaveBeenCalledWith([{
        ...mockProduct,
        farmer_id: 'farmer-123',
      }]);
    });

    it('should not allow consumer to create a product', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${consumerToken}`)
        .send(mockProduct);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Unauthorized');
    });

    it('should validate required fields', async () => {
      const invalidProduct = {
        name: '', // Empty name
        price: -1, // Invalid price
        quantity: 0, // Invalid quantity
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${farmerToken}`)
        .send(invalidProduct);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toHaveLength(3);
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          field: 'name',
          message: expect.any(String),
        })
      );
    });

    it('should handle database errors gracefully', async () => {
      mockSupabase.error = new Error('Database error');

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${farmerToken}`)
        .send(mockProduct);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Failed to create product');
    });
  });

  describe('GET /api/products', () => {
    it('should return a list of products', async () => {
      const mockProducts = [
        { id: 'product-1', ...mockProduct },
        { id: 'product-2', ...mockProduct },
      ];
      mockSupabase.data = mockProducts;

      const response = await request(app)
        .get('/api/products')
        .set('Authorization', `Bearer ${consumerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(mockSupabase.from).toHaveBeenCalledWith('products');
      expect(mockSupabase.select).toHaveBeenCalled();
    });

    it('should filter products by category', async () => {
      mockSupabase.data = [{ id: 'product-1', ...mockProduct }];

      const response = await request(app)
        .get('/api/products?category=vegetables')
        .set('Authorization', `Bearer ${consumerToken}`);

      expect(response.status).toBe(200);
      expect(mockSupabase.eq).toHaveBeenCalledWith('category', 'vegetables');
    });

    it('should handle empty results', async () => {
      mockSupabase.data = [];

      const response = await request(app)
        .get('/api/products')
        .set('Authorization', `Bearer ${consumerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return a single product', async () => {
      mockSupabase.data = { id: 'product-123', ...mockProduct };

      const response = await request(app)
        .get('/api/products/product-123')
        .set('Authorization', `Bearer ${consumerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', 'product-123');
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'product-123');
    });

    it('should return 404 for non-existent product', async () => {
      mockSupabase.error = { code: 'PGRST116' };

      const response = await request(app)
        .get('/api/products/non-existent')
        .set('Authorization', `Bearer ${consumerToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PATCH /api/products/:id', () => {
    it('should allow farmer to update their own product', async () => {
      mockSupabase.data = { id: 'product-123', farmer_id: 'farmer-123', ...mockProduct };

      const update = { price: 5.99, quantity: 50 };
      const response = await request(app)
        .patch('/api/products/product-123')
        .set('Authorization', `Bearer ${farmerToken}`)
        .send(update);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.price).toBe(5.99);
      expect(mockSupabase.update).toHaveBeenCalledWith(update);
    });

    it('should not allow farmer to update another farmer\'s product', async () => {
      mockSupabase.data = { id: 'product-123', farmer_id: 'other-farmer', ...mockProduct };

      const response = await request(app)
        .patch('/api/products/product-123')
        .set('Authorization', `Bearer ${farmerToken}`)
        .send({ price: 5.99 });

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });

    it('should allow admin to update any product', async () => {
      mockSupabase.data = { id: 'product-123', farmer_id: 'farmer-123', ...mockProduct };

      const update = { price: 5.99 };
      const response = await request(app)
        .patch('/api/products/product-123')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(update);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should allow farmer to delete their own product', async () => {
      mockSupabase.data = { id: 'product-123', farmer_id: 'farmer-123' };

      const response = await request(app)
        .delete('/api/products/product-123')
        .set('Authorization', `Bearer ${farmerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(mockSupabase.delete).toHaveBeenCalled();
    });

    it('should not allow consumer to delete products', async () => {
      const response = await request(app)
        .delete('/api/products/product-123')
        .set('Authorization', `Bearer ${consumerToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });

    it('should allow admin to delete any product', async () => {
      mockSupabase.data = { id: 'product-123', farmer_id: 'farmer-123' };

      const response = await request(app)
        .delete('/api/products/product-123')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
}); 