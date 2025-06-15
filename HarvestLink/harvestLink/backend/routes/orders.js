const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { createClient } = require('@supabase/supabase-js');
const { asyncHandler } = require('../utils/asyncHandler');
const { BadRequestError, UnauthorizedError } = require('../utils/errors');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Validation middleware
const validateOrder = [
  body('items').isArray().withMessage('Items must be an array'),
  body('items.*.productId').isUUID().withMessage('Invalid product ID'),
  body('items.*.quantity')
    .isFloat({ min: 0.01 })
    .withMessage('Quantity must be greater than 0'),
  body('deliveryMethod')
    .isIn(['pickup', 'delivery'])
    .withMessage('Invalid delivery method'),
  body('paymentMethod')
    .isIn(['credit_card', 'debit_card', 'cash', 'bank_transfer'])
    .withMessage('Invalid payment method'),
  body('deliveryAddress')
    .if(body('deliveryMethod').equals('delivery'))
    .isObject()
    .withMessage('Delivery address is required for delivery orders'),
  body('deliveryAddress.street')
    .if(body('deliveryMethod').equals('delivery'))
    .notEmpty()
    .withMessage('Street is required'),
  body('deliveryAddress.city')
    .if(body('deliveryMethod').equals('delivery'))
    .notEmpty()
    .withMessage('City is required'),
  body('deliveryAddress.state')
    .if(body('deliveryMethod').equals('delivery'))
    .notEmpty()
    .withMessage('State is required'),
  body('deliveryAddress.zipCode')
    .if(body('deliveryMethod').equals('delivery'))
    .notEmpty()
    .withMessage('Zip code is required'),
];

// Helper function to validate product availability
const validateProductAvailability = async (items) => {
  const productIds = items.map(item => item.productId);
  
  const { data: products, error } = await supabase
    .from('products')
    .select('id, quantity, price, name, farmer_id')
    .in('id', productIds);

  if (error) throw new Error('Failed to fetch products');

  const validationErrors = [];
  const orderItems = [];

  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    if (!product) {
      validationErrors.push(`Product ${item.productId} not found`);
      continue;
    }

    if (product.quantity < item.quantity) {
      validationErrors.push(
        `Insufficient quantity for ${product.name}. Available: ${product.quantity}`
      );
    }

    orderItems.push({
      ...item,
      unitPrice: product.price,
      farmerId: product.farmer_id,
      subtotal: product.price * item.quantity,
    });
  }

  if (validationErrors.length > 0) {
    throw new BadRequestError(validationErrors.join(', '));
  }

  return orderItems;
};

// Create new order
router.post(
  '/',
  validateOrder,
  asyncHandler(async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array());
    }

    const { items, deliveryMethod, paymentMethod, deliveryAddress } = req.body;
    const userId = req.user.id; // From auth middleware

    // Start a Supabase transaction
    const { data: order, error: orderError } = await supabase.rpc(
      'create_order',
      {
        p_consumer_id: userId,
        p_items: items,
        p_delivery_method: deliveryMethod,
        p_payment_method: paymentMethod,
        p_delivery_address: deliveryAddress,
      }
    );

    if (orderError) {
      console.error('Order creation error:', orderError);
      throw new Error('Failed to create order');
    }

    // Emit real-time update
    await supabase
      .channel('order-updates')
      .send({
        type: 'broadcast',
        event: 'order_created',
        payload: { orderId: order.id },
      });

    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully',
    });
  })
);

// Get order by ID
router.get(
  '/:orderId',
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;

    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (
            id,
            name,
            images
          )
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new BadRequestError('Order not found');
      }
      throw new Error('Failed to fetch order');
    }

    // Check authorization
    if (order.consumer_id !== userId && order.farmer_id !== userId) {
      throw new UnauthorizedError('Not authorized to view this order');
    }

    res.json({
      success: true,
      data: order,
    });
  })
);

// Update order status
router.patch(
  '/:orderId/status',
  [
    body('status')
      .isIn(['confirmed', 'processing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'cancelled'])
      .withMessage('Invalid status'),
    body('note').optional().isString(),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array());
    }

    const { orderId } = req.params;
    const { status, note } = req.body;
    const userId = req.user.id;

    // Check authorization and update status
    const { data: order, error } = await supabase.rpc('update_order_status', {
      p_order_id: orderId,
      p_status: status,
      p_note: note,
      p_user_id: userId,
    });

    if (error) {
      if (error.code === 'PGRST116') {
        throw new BadRequestError('Order not found');
      }
      if (error.message.includes('unauthorized')) {
        throw new UnauthorizedError('Not authorized to update this order');
      }
      throw new Error('Failed to update order status');
    }

    // Emit real-time update
    await supabase
      .channel('order-updates')
      .send({
        type: 'broadcast',
        event: 'order_status_updated',
        payload: { orderId, status },
      });

    res.json({
      success: true,
      data: order,
      message: 'Order status updated successfully',
    });
  })
);

module.exports = router; 