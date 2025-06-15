const { createClient } = require('@supabase/supabase-js');
const { validationResult } = require('express-validator');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Helper function to handle Supabase errors
const handleSupabaseError = (error, res) => {
  console.error('Supabase error:', error);
  
  if (error.code === 'PGRST116') {
    return res.status(404).json({
      success: false,
      message: 'Resource not found',
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
};

// Helper function to check product ownership
const checkProductOwnership = async (productId, userId) => {
  const { data, error } = await supabase
    .from('products')
    .select('farmer_id')
    .eq('id', productId)
    .single();

  if (error) throw error;
  return data.farmer_id === userId;
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Check if user is a farmer
    if (req.user.role !== 'farmer') {
      return res.status(403).json({
        success: false,
        message: 'Only farmers can create products',
      });
    }

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }

    const productData = {
      ...req.body,
      farmer_id: req.user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    handleSupabaseError(error, res);
  }
};

// Get all products with optional filters
exports.getProducts = async (req, res) => {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        farmers:farmer_id (
          id,
          first_name,
          last_name,
          farm_name,
          farm_location
        )
      `);

    // Apply filters
    const { category, minPrice, maxPrice, tags, search } = req.query;

    if (category) {
      query = query.eq('category', category);
    }

    if (minPrice) {
      query = query.gte('price', parseFloat(minPrice));
    }

    if (maxPrice) {
      query = query.lte('price', parseFloat(maxPrice));
    }

    if (tags) {
      const tagArray = tags.split(',');
      query = query.contains('tags', tagArray);
    }

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    // Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    query = query.range(start, end);

    const { data, error, count } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    handleSupabaseError(error, res);
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        farmers:farmer_id (
          id,
          first_name,
          last_name,
          farm_name,
          farm_location
        ),
        reviews (
          id,
          rating,
          comment,
          created_at,
          consumers:consumer_id (
            id,
            first_name,
            last_name
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    handleSupabaseError(error, res);
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, id: userId } = req.user;

    // Check if user is authorized to update the product
    if (role !== 'admin') {
      const isOwner = await checkProductOwnership(id, userId);
      if (!isOwner) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to update this product',
        });
      }
    }

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }

    const updateData = {
      ...req.body,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    handleSupabaseError(error, res);
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, id: userId } = req.user;

    // Check if user is authorized to delete the product
    if (role !== 'admin') {
      const isOwner = await checkProductOwnership(id, userId);
      if (!isOwner) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to delete this product',
        });
      }
    }

    // Check if product has any active orders
    const { data: activeOrders, error: orderError } = await supabase
      .from('orders')
      .select('id')
      .eq('product_id', id)
      .in('status', ['pending', 'processing', 'shipped'])
      .limit(1);

    if (orderError) throw orderError;

    if (activeOrders?.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete product with active orders',
      });
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    handleSupabaseError(error, res);
  }
};

// Update product availability
exports.updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, is_available } = req.body;
    const { role, id: userId } = req.user;

    // Check if user is authorized to update the product
    if (role !== 'admin') {
      const isOwner = await checkProductOwnership(id, userId);
      if (!isOwner) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to update this product',
        });
      }
    }

    const updateData = {
      quantity: quantity ?? undefined,
      is_available: is_available ?? undefined,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    handleSupabaseError(error, res);
  }
}; 