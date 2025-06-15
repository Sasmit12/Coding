const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ['kg', 'g', 'lb', 'oz', 'piece', 'dozen', 'bunch'],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    images: [{
      type: String,
      required: true,
    }],
    category: {
      type: String,
      required: true,
      enum: [
        'vegetables',
        'fruits',
        'dairy',
        'meat',
        'eggs',
        'honey',
        'grains',
        'herbs',
        'other',
      ],
    },
    tags: [{
      type: String,
      enum: ['organic', 'seasonal', 'fresh', 'local', 'gluten-free', 'vegan'],
    }],
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    farmLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    availability: {
      type: String,
      enum: ['in-stock', 'low-stock', 'out-of-stock'],
      default: 'in-stock',
    },
    harvestDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    // Additional fields for product details
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      fiber: Number,
    },
    storageInstructions: String,
    preparationInstructions: String,
    allergens: [String],
    certifications: [{
      type: String,
      enum: ['USDA Organic', 'Non-GMO', 'Fair Trade', 'Local'],
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ 'farmLocation': '2dsphere' });
productSchema.index({ category: 1, tags: 1 });
productSchema.index({ farmer: 1, isActive: 1 });

// Virtual for average rating
productSchema.virtual('averageRating').get(function () {
  return this.rating / (this.reviewCount || 1);
});

// Method to update product availability based on quantity
productSchema.methods.updateAvailability = function () {
  if (this.quantity <= 0) {
    this.availability = 'out-of-stock';
  } else if (this.quantity < 10) {
    this.availability = 'low-stock';
  } else {
    this.availability = 'in-stock';
  }
};

// Method to update rating
productSchema.methods.updateRating = function (newRating) {
  const totalRating = this.rating * this.reviewCount + newRating;
  this.reviewCount += 1;
  this.rating = totalRating / this.reviewCount;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 