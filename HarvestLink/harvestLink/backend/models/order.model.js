const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'g', 'lb', 'oz', 'piece', 'dozen', 'bunch'],
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'processing',
        'ready-for-pickup',
        'out-for-delivery',
        'delivered',
        'cancelled',
      ],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['credit-card', 'debit-card', 'cash', 'bank-transfer'],
      required: true,
    },
    deliveryMethod: {
      type: String,
      enum: ['pickup', 'delivery'],
      required: true,
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    pickupLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
      },
      address: String,
    },
    deliveryInstructions: String,
    estimatedDeliveryDate: Date,
    actualDeliveryDate: Date,
    cancellationReason: String,
    refundAmount: {
      type: Number,
      min: 0,
    },
    notes: String,
    // Tracking information
    trackingNumber: String,
    trackingUrl: String,
    // Timestamps for status changes
    statusHistory: [{
      status: {
        type: String,
        enum: [
          'pending',
          'confirmed',
          'processing',
          'ready-for-pickup',
          'out-for-delivery',
          'delivered',
          'cancelled',
        ],
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      note: String,
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ consumer: 1, createdAt: -1 });
orderSchema.index({ farmer: 1, createdAt: -1 });
orderSchema.index({ status: 1, paymentStatus: 1 });

// Method to generate order number
orderSchema.statics.generateOrderNumber = async function () {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${year}${month}${day}-${random}`;
};

// Method to calculate total amount
orderSchema.methods.calculateTotal = function () {
  this.totalAmount = this.items.reduce((total, item) => total + item.subtotal, 0);
};

// Method to update order status
orderSchema.methods.updateStatus = function (newStatus, note = '') {
  this.status = newStatus;
  this.statusHistory.push({
    status: newStatus,
    note,
  });
};

// Pre-save middleware to ensure order number is set
orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.orderNumber = await this.constructor.generateOrderNumber();
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 